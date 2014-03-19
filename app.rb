class WebTemplates < Sinatra::Base
  set :sprockets, Sprockets::Environment.new(root)
  set :assets_prefix, '/assets'
  set :digest_assets, true

  set :pages_dir, File.join(root, 'pages')

  set :components_dir, File.join(root, 'templates', 'components')
  set :components, Dir.entries(components_dir).select { |f| f =~ /^[^\.]/ }

  set :layouts_dir, File.join(root, 'views', 'example_layouts')
  set :layouts, Dir.entries(layouts_dir).select { |f| f =~ /.+\.slim$/ }.map { |l| l.gsub(/\.slim$/, '') }

  configure do
    sprockets.append_path File.join(root, 'templates')
    sprockets.cache = Sprockets::Cache::FileStore.new(File.join(root, 'tmp'))

    Sprockets::Helpers.configure do |config|
      config.environment = sprockets
      config.prefix      = assets_prefix
      config.digest      = digest_assets
      config.public_path = public_folder
    end
  end

  helpers do
    include Sprockets::Helpers

    def path_to_title(path)
      return nil if path.blank?
      path.gsub(/^todo-/, '').split('-').map(&:capitalize).join(' ')
    end

    def page_title
      return @settings['title'] if @settings and !@settings['title'].empty?
      path_to_title request.path_info.split('/').last
    end

    alias :component_title :path_to_title
    alias :layout_title    :path_to_title

    def path_pending?(path)
      path =~ /^todo-/
    end

    alias :component_pending? :path_pending?
    alias :layout_pending?    :path_pending?

    def component_path(component)
      "/components/#{component.downcase}"
    end

    def layout_path(layout, source=false)
      path = "/layouts/#{layout.downcase}"
      !!source ? "#{path}?view=source" : path
    end

    def render_markdown(md)
      @pipeline ||= HTML::Pipeline.new [
        HTML::Pipeline::MarkdownFilter,
        HTML::Pipeline::SyntaxHighlightFilter
      ]
      (@pipeline.call(md))[:output].to_s
    end

    def syntax_highlight(html)
      Pygments.highlight(html, lexer: 'html')
    end
  end

  get '/' do
    @components = settings.components
    @layouts    = settings.layouts
    slim :index
  end

  get '/components/*' do |path|
    halt(404) unless settings.components.include? path
    @component = path
    @settings  = { 'title' => component_title(@component) }
    @documents = Dir.glob(File.join(settings.components_dir, path, '*.md')).sort
    @documents = @documents.map do |f|
      fmp = FrontMatterParser.parse_file(f)
      @settings.merge!(fmp.front_matter)
      render_markdown fmp.content
    end
    slim :component
  end

  get '/layouts/*' do |path|
    halt(404) unless settings.layouts.include? path
    layout_view = "example_layouts/#{path}".to_sym

    if request['view'].to_s.downcase == 'source'
      @file   = path
      @source = slim layout_view, layout: false, pretty: true
      @source = syntax_highlight(@source)
      slim :source_view
    else
      slim layout_view
    end
  end

  get "#{Sprockets::Helpers.prefix}/*" do |path|
    env_sprockets = request.env.dup
    env_sprockets['PATH_INFO'] = path
    settings.sprockets.call env_sprockets
  end

  get '/*' do
    viewname  = params[:splat].first
    file  = File.join settings.pages_dir, "#{viewname}.md"
    index = File.join settings.pages_dir, "#{viewname}/index.md"

    file = index unless File.exist?(file)

    if File.exist?(file)
      @settings = { 'title' => path_to_title(viewname) }
      fmp = FrontMatterParser.parse_file(file)
      @settings.merge!(fmp.front_matter)
      @content = render_markdown render_markdown fmp.content
      slim :page
    else
      halt(404)
    end
  end

end
