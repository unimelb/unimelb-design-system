require 'rubygems' unless defined?(Gem)
require 'securerandom'

### Static export

APP_FILE  = './doc-site/app/app.rb'
APP_CLASS = 'Sinatra::Application'

require 'sinatra'
require 'sinatra/export/rake'
require_relative './doc-site/app/app'

namespace :assets do
  desc 'Build the public assets with node'
  task :build do
    system 'npm run build-production'
  end

  desc 'Export static site'
  task :export do
    system 'rm -rf build && mkdir build'
    DocSite::App.export!
  end
end

task :default do
  # TODO: js tests, visual diff
end
