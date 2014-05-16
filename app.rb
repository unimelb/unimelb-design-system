class SectionWrapFilter < HTML::Pipeline::Filter
  def call
    "<section>#{doc.to_s}</section>"
  end
end

class WebTemplates < Sinatra::Base
  set :sprockets, Sprockets::Environment.new(root)
  set :assets_prefix, '/assets'
  set :digest_assets, true
  set :pages_dir, File.join(root, 'pages')
  set :compass_gem_root, Gem.loaded_specs['compass'].full_gem_path

  set :components_dir, File.join(root, 'templates', 'components')
  set :components, Dir.entries(components_dir).select { |f| f =~ /^[^\.]/ }

  set :layouts_dir, File.join(root, 'views', 'example_layouts')
  set :layouts, Dir.entries(layouts_dir).select { |f| f =~ /^[^notes].+\.slim$/ }.map { |l| l.gsub(/\.slim$/, '') }

  configure do
    sprockets.append_path File.join(root, 'templates')
    sprockets.append_path File.join(compass_gem_root, 'frameworks', 'compass', 'stylesheets')
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

    def layout_path(layout, opt=false)
      path = "/layouts/#{layout.downcase}"
      !!opt ? "#{path}?view="+opt : path
    end

    def render_markdown(md)
      @pipeline ||= HTML::Pipeline.new [
        HTML::Pipeline::MarkdownFilter,
        # HTML::Pipeline::SyntaxHighlightFilter
      ]
      (@pipeline.call(md))[:output].to_s
    end

    def render_markdown_with_section(md)
      @pipeline_with_section = HTML::Pipeline.new [
        HTML::Pipeline::MarkdownFilter,
        # HTML::Pipeline::SyntaxHighlightFilter,
        SectionWrapFilter
      ]
      (@pipeline_with_section.call(md))[:output].to_s
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

    @documents = []
    raw_documents = Dir.glob(File.join(settings.components_dir, path, '*')).sort
    raw_documents.map do |f|
      ext = f.split(".").last
      if ext=="md"
        fmp = FrontMatterParser.parse_file(f)
        @settings.merge!(fmp.front_matter)
        render_method = !!fmp.front_matter['no_section_wrap'] ? :render_markdown : :render_markdown_with_section
        @documents << send(render_method, fmp.content)
      elsif ext=="slim"
        @documents << slim(File.read(f), layout: false)
      end
    end

    slim :component
  end

  get '/layouts/*' do |path|
    halt(404) unless settings.layouts.include? path
    prepend = "example_layouts/"
    layout_view = (prepend+path).to_sym

    if request['view'].to_s.downcase == 'source'
      @file   = path
      @source = slim layout_view, layout: false, pretty: true
      @source = syntax_highlight(@source)
      @notes  = slim (prepend+'notes-'+path).to_sym, layout: false rescue nil
      slim :source_view
    elsif request['view'].to_s.downcase == 'demo'
      slim layout_view
    else
      overview = prepend+'overview-'+path
      if File.exist?(overview)
        slim overview.to_sym
      else
        slim layout_view
      end
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
