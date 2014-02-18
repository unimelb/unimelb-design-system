class WebTemplates < Sinatra::Base

  set :sprockets, Sprockets::Environment.new(root)
  set :assets_prefix, '/assets'
  set :digest_assets, true
  set :components_dir, File.join(root, 'templates', 'components')
  set :components, Dir.entries(components_dir).select { |f| f =~ /^[^\.]/ }
  set :globals_dir, File.join(root, 'templates', 'globals')
  set :globals, Dir.entries(globals_dir).select { |f| f =~ /^[^\.]/ }
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

    def component_title(component)
      component.capitalize
    end

    def component_path(component)
      "/components/#{component.downcase}"
    end

    def global_title(global)
      global.capitalize
    end

    def global_path(global)
      "/globals/#{global.downcase}"
    end

    def layout_title(layout)
      layout.capitalize
    end

    def layout_path(layout)
      "/layouts/#{layout.downcase}"
    end

    def layout_source_path(layout)
      "/layouts/#{layout.downcase}?view=source"
    end

  end

  get '/' do
    @globals    = settings.globals
    @components = settings.components
    @layouts    = settings.layouts
    slim :index
  end

  get '/components/*' do |path|
    halt(404) unless settings.components.include? path
    @component = component_title(path)
    @documents = Dir.glob(File.join(settings.components_dir, path, '*.md')).sort
    @documents = @documents.map { |d| GitHub::Markdown.render_gfm(File.read(d)) }
    slim :component
  end

  get '/globals/*' do |path|
    halt(404) unless settings.globals.include? path
    @global    = global_title(path)
    @documents = Dir.glob(File.join(settings.globals_dir, path, '*.md')).sort
    @documents = @documents.map { |d| GitHub::Markdown.render_gfm(File.read(d)) }
    slim :global
  end

  get '/layouts/*' do |path|
    halt(404) unless settings.layouts.include? path
    layout_view = "example_layouts/#{path}".to_sym

    if request['view'].to_s == 'source'
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
