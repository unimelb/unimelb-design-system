#!/usr/bin/env rackup
# encoding: utf-8

if ENV['RACK_ENV'] == 'production'
  use Rack::Static,
      urls:  ['/assets/', '/assets/images/'],
      root:  'build'

  run lambda { |env|
    req = Rack::Request.new(env)

    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open(File.join('build', req.path, '/index.html'), File::RDONLY)
    ]
  }

else
  require 'rubygems'
  require 'bundler'

  Bundler.require

  require_relative './doc-site/app/app'

  ENV['ASSET_ENV'] = 'development'

  run DocSite::App
end
