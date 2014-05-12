if defined?(Sinatra)
  # This is the configuration to use when running within sinatra
  project_path = Sinatra::Application.root
  environment = :development
else
  # this is the configuration to use when running within the compass command line tool.
  css_dir = File.join 'public', 'assets', 'stylesheets'
  relative_assets = true
  environment = :production
end

# This is common configuration
sass_dir = File.join 'templates'
images_dir = File.join 'public', 'assets', 'images'
http_path = "/"
http_images_path = "/assets/images"
http_stylesheets_path = "/assets/stylesheets"
