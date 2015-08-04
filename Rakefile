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
    deploy = File.expand_path(File.join(File.dirname(__FILE__), 'deploy'))
    system "rm -rf #{deploy}"
    system 'npm run build-production'
  end

  desc 'Export static site'
  task :export do
    if ENV['VERSION'].nil? || ENV['VERSION'].empty?
      abort 'Missing VERSION parameter'
    end

    root =      File.expand_path(File.join(File.dirname(__FILE__)))
    build_dir = File.join(root, 'build', ENV['VERSION'])
    app_dir =   File.join(root, 'doc-site', 'public', 'assets')

    # clear out existing build
    system "cd #{root}/ && rm -rf #{build_dir} && mkdir #{build_dir}"

    # sinatra:export
    DocSite::App.export!

    # copy static assets
    system "cp -a #{app_dir} #{build_dir}"

    # build webpack and copy deploy files
    Rake::Task['assets:build'].invoke
    system "cp -a #{root}/deploy/* #{build_dir}/assets"

    # remove fingerprint on running precompiled assets
    %w(components docs injection).each do |asset|
      system "mv #{build_dir}/assets/#{asset}*.css #{build_dir}/assets/#{asset}.css"
      system "mv #{build_dir}/assets/#{asset}*.js #{build_dir}/assets/#{asset}.js"
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
