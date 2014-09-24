require 'rubygems' unless defined?(Gem)
require 'rake/sprocketstask'
require 'compass'
require 'autoprefixer-rails'

ROOT_DIR  = File.expand_path File.dirname(__FILE__)
BUILD_DIR = File.expand_path File.join(ROOT_DIR,  'build')

### Monkey patch sprockets

module Sprockets
  class Asset
    def digest_path
      return logical_path if logical_path =~ /\.(css|js)$/
      return logical_path if logical_path =~ /\bfonts\b\/.+\.(eot|svg|ttf|woff)$/
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
      if path[0..1] == '//'
        File.join(INJECTION_SERVER_PATH, path)
      else
        asset = environment[path]
        raise "Unknown asset: #{path}" if asset.nil?
        digest = asset.digest_path
        File.join(INJECTION_SERVER_PATH, digest)
      end
    end
  end

  Rake::SprocketsTask.new(:assets) do |t|
    t.environment = Sprockets::Environment.new do |e|
      e.js_compressor  = :uglify
      e.css_compressor = :scss
      e.append_path File.join(Gem.loaded_specs['compass-core'].full_gem_path, 'stylesheets')
      e.append_path INJECTION_ASSETS
      e.context_class.class_eval do
        include InjectionHelper
      end
    end
    AutoprefixerRails.install(t.environment)
    t.output      = INJECTION_BUILD_DIR
    t.assets      = %w{*.svg *.png *.jpg *.jpeg injection.js injection.css}
    t.logger      = Logger.new($stdout)
    t.log_level   = :debug
    t.keep        = 0
  end
end

### Templates

namespace :templates do

  module TemplatesHelper
    def asset_path(path, options={})
      if path[0..1] == '//'
        File.join(INJECTION_SERVER_PATH, path)
      else
        asset = environment[path]
        raise "Unknown asset: #{path}" if asset.nil?
        digest = asset.digest_path
        File.join(TEMPLATES_SERVER_PATH, digest)
      end
    end
  end

  TEMPLATE_VERSION       = ENV['VERSION'] ? ENV['VERSION'] : 'beta'
  TEMPLATES_ASSETS       = File.expand_path File.join(ROOT_DIR,  'templates')
  TEMPLATES_VERSION_PATH = File.join('templates', TEMPLATE_VERSION)
  TEMPLATES_BUILD_DIR    = File.expand_path File.join(BUILD_DIR, TEMPLATES_VERSION_PATH)
  TEMPLATES_SERVER_PATH  = "/#{TEMPLATES_VERSION_PATH}/"

  Rake::SprocketsTask.new(:assets) do |t|
    t.environment = Sprockets::Environment.new do |e|
      e.js_compressor  = :uglify
      e.css_compressor = :scss
      e.append_path File.join(Gem.loaded_specs['compass-core'].full_gem_path, 'stylesheets')
      e.append_path TEMPLATES_ASSETS
      e.context_class.class_eval do
        include TemplatesHelper
      end
    end
    AutoprefixerRails.install(t.environment)
    t.output      = "#{TEMPLATES_BUILD_DIR}/manifest-#{SecureRandom.hex(16)}.json"
    t.assets      = %w{*.svg *.png *.jpg *.jpeg uom.js isotope.pkgd.min.js uom.css}
    t.logger      = Logger.new($stdout)
    t.log_level   = :debug
    t.keep        = 0
  end
end

namespace :assets do
  task :version_check do
    raise "Please specify a version. e.g. rake assets:deploy VERSION=2" unless ENV['VERSION']
  end

  desc 'Clobber all local assets'
  task clean: ['assets:version_check', 'templates:clobber_assets', 'injection:clobber_assets']

  desc 'Compile all assets'
  task compile: ['assets:version_check', 'templates:assets', 'injection:assets']
end
