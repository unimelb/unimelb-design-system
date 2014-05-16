require_relative 'helpers'

module WebTemplates
  class App < Sinatra::Base
    helpers Helpers

    get '/' do
      slim :index
    end

  end
end
