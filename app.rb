class WebTemplates < Sinatra::Base
  set :sprockets, Sprockets::Environment.new(root)
  set :assets_prefix, '/assets'
  set :digest_assets, true

  configure do
    sprockets.append_path File.join(root, 'templates')
    Sprockets::Helpers.configure do |config|
      config.environment = sprockets
      config.prefix      = assets_prefix
      config.digest      = digest_assets
      config.public_path = public_folder
    end
  end

  helpers do
    include Sprockets::Helpers
  end

  get '/' do
    slim :index
  end

  get "#{Sprockets::Helpers.prefix}/*" do |path|
    env_sprockets = request.env.dup
    env_sprockets['PATH_INFO'] = path
    settings.sprockets.call env_sprockets
  end

end
