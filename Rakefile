require 'rubygems' unless defined?(Gem)
require 'rake/sprocketstask'
require 'compass'
require 'asset_sync'
require 'dotenv/tasks'

ROOT_DIR  = File.expand_path File.dirname(__FILE__)
BUILD_DIR = File.expand_path File.join(ROOT_DIR,  'build')

### Monkey patch sprockets

module Sprockets
  class Asset
    def digest_path
      return logical_path if logical_path =~ /\.(css|js)$/
      logical_path.sub(/\.(\w+)$/) { |ext| "-#{digest}#{ext}" }
    end
  end
end

### Injection

namespace :injection do

  INJECTION_ASSETS      = File.expand_path File.join(ROOT_DIR,  'injection')
  INJECTION_BUILD_DIR   = File.expand_path File.join(BUILD_DIR, 'injection')
  INJECTION_SERVER_PATH = '/injection/'

  module InjectionHelper
    def asset_path(path, options={})
      asset = environment[path]
      raise "Unknown asset: #{path}" if asset.nil?
      digest = asset.digest_path
      File.join(INJECTION_SERVER_PATH, digest)
    end
  end

  Rake::SprocketsTask.new(:assets) do |t|
    t.environment = Sprockets::Environment.new do |e|
      e.js_compressor  = :uglify
      e.css_compressor = :scss
      e.append_path File.join(Gem.loaded_specs['compass'].full_gem_path, 'frameworks', 'compass', 'stylesheets') # <-- TODO: this is not right
      e.append_path INJECTION_ASSETS
      e.context_class.class_eval do
        include InjectionHelper
      end
    end
    t.output      = INJECTION_BUILD_DIR
    t.assets      = %w{*.htc *.eot *.svg *.ttf *.woff *.png *.jpg *.jpeg injection.js injection.css}
    t.logger      = Logger.new($stdout)
    t.log_level   = :debug
    t.keep        = 0
  end

  desc 'Uploads everything in the injection build directory to S3'
  task sync: :dotenv do
    AssetSync.configure do |config|
      config.fog_provider          = 'AWS'
      config.fog_directory         = ENV['FOG_DIRECTORY']
      config.aws_access_key_id     = ENV['AWS_ACCESS_KEY_ID']
      config.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
      config.existing_remote_files = 'delete'
      config.manifest              = false
      config.gzip_compression      = false
      config.run_on_precompile     = false
      config.log_silently          = false
      config.prefix                = 'injection'
      config.public_path           = BUILD_DIR
    end
    AssetSync.sync
  end

end

### Templates

namespace :templates do

  module TemplatesHelper
    def asset_path(path, options={})
      asset = environment[path]
      raise "Unknown asset: #{path}" if asset.nil?
      digest = asset.digest_path
      File.join(TEMPLATES_SERVER_PATH, digest)
    end
  end

  SPECIFIED_VERSION      = ENV['VERSION'] ? ENV['VERSION'] : 'beta'
  TEMPLATE_VERSION       = SPECIFIED_VERSION =~ /^\d$/ ? "v#{SPECIFIED_VERSION}" : SPECIFIED_VERSION
  TEMPLATES_ASSETS       = File.expand_path File.join(ROOT_DIR,  'templates')
  TEMPLATES_VERSION_PATH = File.join('templates', TEMPLATE_VERSION)
  TEMPLATES_BUILD_DIR    = File.expand_path File.join(BUILD_DIR, TEMPLATES_VERSION_PATH)
  TEMPLATES_SERVER_PATH  = "/#{TEMPLATES_VERSION_PATH}/"

  Rake::SprocketsTask.new(:assets) do |t|
    t.environment = Sprockets::Environment.new do |e|
      e.js_compressor  = :uglify
      e.css_compressor = :scss
      e.append_path File.join(Gem.loaded_specs['compass'].full_gem_path, 'frameworks', 'compass', 'stylesheets') # <-- TODO: this is not right
      e.append_path TEMPLATES_ASSETS
      e.context_class.class_eval do
        include TemplatesHelper
      end
    end
    t.output      = TEMPLATES_BUILD_DIR
    t.assets      = %w{*.eot *.svg *.ttf *.woff *.png *.jpg *.jpeg uom.js uom.css}
    t.logger      = Logger.new($stdout)
    t.log_level   = :debug
    t.keep        = 0
  end


  desc 'Uploads everything in the templates build directory to S3'
  task sync: :dotenv do
    AssetSync.configure do |config|
      config.fog_provider          = 'AWS'
      config.fog_directory         = ENV['FOG_DIRECTORY']
      config.aws_access_key_id     = ENV['AWS_ACCESS_KEY_ID']
      config.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
      config.existing_remote_files = 'delete'
      config.manifest              = false
      config.gzip_compression      = false
      config.run_on_precompile     = false
      config.log_silently          = false
      config.prefix                = TEMPLATES_VERSION_PATH
      config.public_path           = BUILD_DIR
    end
    AssetSync.sync
  end

end

namespace :assets do

  def version_required!
    raise "Please specify a version. e.g. rake assets:deploy VERSION=2" unless ENV['VERSION']
  end

  desc 'Clobber all local assets'
  task :clean do
    version_required!
    Rake::Task["injection:clobber_assets"].invoke
    Rake::Task["templates:clobber_assets"].invoke
  end

  desc 'Compile all assets'
  task :compile do
    version_required!
    Rake::Task["injection:assets"].invoke
    Rake::Task["templates:assets"].invoke
  end

  desc 'Upload all assets to s3'
  task :sync do
    version_required!
    Rake::Task["injection:sync"].invoke
    Rake::Task["templates:sync"].invoke
  end

  desc 'Clean, compile and sync all assets'
  task :deploy do
    Rake::Task["assets:clean"].invoke
    Rake::Task["assets:compile"].invoke
    Rake::Task["assets:sync"].invoke
  end

end
