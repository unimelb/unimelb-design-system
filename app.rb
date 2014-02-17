class WebTemplates < Sinatra::Base

  get '/' do
    slim :index
  end

end
