class WebTemplates < Sinatra::Base
  set :sprockets, Sprockets::Environment.new(root)
  set :assets_prefix, '/assets'
  set :digest_assets, true
  set :components_dir, File.join(root, 'templates', 'components')
  set :components, Dir.entries(components_dir).select { |f| f =~ /^[^\.]/ }

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

  end

  get '/' do
    @components = settings.components
    slim :index
  end

  get '/components/*' do |path|
    halt(404) unless settings.components.include? path
    @component = component_title(path)
    @documents = Dir.glob(File.join(settings.components_dir, path, '*.md')).sort
    @documents = @documents.map { |d| GitHub::Markdown.render_gfm(File.read(d)) }
    slim :component
  end

  get "#{Sprockets::Helpers.prefix}/*" do |path|
    env_sprockets = request.env.dup
    env_sprockets['PATH_INFO'] = path
    settings.sprockets.call env_sprockets
  end

end
