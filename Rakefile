### Static export

APP_FILE  = './doc-site/app/app.rb'
APP_CLASS = 'Sinatra::Application'

require 'securerandom'
require 'sinatra'
require 'sinatra/partial'
require 'sinatra/export'
require 'sinatra/export/rake'
require 'sprockets'
require 'sprockets/helpers'
require 'front_matter_parser'
require 'slim'
require 'html/pipeline'
require_relative './doc-site/app/app'

namespace :assets do
  desc 'Build the public assets with node'
  task :build do
    system 'npm run build-production'
  end

  desc 'Export static site'
  task :export do
    if ENV['VERSION'].nil? || ENV['VERSION'].empty?
      abort 'Missing VERSION parameter'
    end

    root =       File.expand_path(File.join(File.dirname(__FILE__)))
    build_dir =  File.join(root, 'build', ENV['VERSION'])
    public_dir = File.join(root, 'doc-site', 'public')

    # clear out existing build
    system "cd #{root}/ && rm -rf #{build_dir} && mkdir #{build_dir}"

    # sinatra:export
    DocSite::App.export!

    # copy static assets
    system "cp -a #{public_dir}/. #{build_dir}"

    # build assets with webpack and copy files to doc site
    Rake::Task['assets:build'].invoke
    system "cp -a #{root}/assets/build/** #{build_dir}/assets"

    # delete unused targets for static site
    %w(debranded forms docs.js).each do |asset|
      system "rm #{build_dir}/assets/#{asset}*"
    end
  end
end

namespace :icons do
  desc 'Combine atomic icon files into single file'
  task :combine do
    chunks = File.expand_path(File.join(File.dirname(__FILE__), 'src', 'symbols'))
    combo = './src/combo.svg'
    open(combo, 'w') do |saved_file|
      saved_file.write('<svg xmlns="http://www.w3.org/2000/svg">
    ')
    end

    Dir.entries(chunks).reject { |f| f =~ /^[\.|\_]*[\.]$/ }.each do |vol|
      begin
        open(combo, 'a') do |saved_file|
          open(File.join(chunks, vol), 'rb') do |read_file|
            buf = read_file.read
            buf.gsub!('svg xmlns="http://www.w3.org/2000/svg"', 'symbol id="' + File.basename(vol, '.svg') + '"')
            buf.gsub!('</svg>', '</symbol>')
            buf += '
    ';
            saved_file.write(buf)
          end
        end
        puts vol + ' copied'
      end
    end

    open(combo, 'a') do |saved_file|
      saved_file.write('</svg>')
    end
  end
end

task :default do
  # TODO: js tests, visual diff
end
