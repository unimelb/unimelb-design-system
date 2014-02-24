class WebTemplates < Sinatra::Base
  set :sprockets, Sprockets::Environment.new(root)
  set :assets_prefix, '/assets'
  set :digest_assets, true

  set :components_dir, File.join(root, 'templates', 'components')
  set :components, Dir.entries(components_dir).select { |f| f =~ /^[^\.|globals]/ }

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
      path.gsub(/^todo-/, '').split('-').map(&:capitalize).join(' ')
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
  end

  get '/' do
    @components = settings.components
    @layouts    = settings.layouts
    slim :index
  end

  get '/components/*' do |path|
    halt(404) unless settings.components.include? path
    @component = path
    @documents = Dir.glob(File.join(settings.components_dir, path, '*.md')).sort
    @documents = @documents.map { |d| GitHub::Markdown.render_gfm(File.read(d)) }
    slim :component
  end

  get '/layouts/*' do |path|
    halt(404) unless settings.layouts.include? path
    layout_view = "example_layouts/#{path}".to_sym

    if request['view'].to_s.downcase == 'source'
      @file   = path
      @source = slim layout_view, layout: false, pretty: true
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

end
