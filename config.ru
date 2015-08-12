#!/usr/bin/env rackup
# encoding: utf-8

if ENV['RACK_ENV'] == 'production'

  use Rack::Static,
      urls:  ['/assets/'],
      root:  'build/' + ENV['VERSION']

  run lambda { |env|
    req = Rack::Request.new(env)
    ver = req.path.split('/')

    if req.path.end_with?('/') || !ver.last.index('.').nil?

      # Previous releases
      if req.path.start_with?('/releases')
        ver.shift(2) # drop releases prefix

        page = File.join('build', ver.join('/'))

      else
        page = File.join('build', ENV['VERSION'], req.path)
      end

      if File.directory?(page)
        # Default index.html
        [
          200,
          {
            'Content-Type'  => 'text/html',
            'Cache-Control' => 'public, max-age=86400'
          },
          File.open(File.join(page, '/index.html'), File::RDONLY)
        ]

      elsif File.exist?(page)
        # Normal request
        if req.path.end_with?('svg')
          type = 'image/svg+xml'
        else
          type = ''
        end
        [
          200,
          {
            'Content-Type'  => type,
            'Cache-Control' => 'public, max-age=86400'
          },
          File.open(page, File::RDONLY)
        ]

      else
        [
          404,
          {
            'Content-Type'  => 'text/html',
            'Cache-Control' => 'public, max-age=86400'
          },
          File.open(File.join('build', ENV['VERSION'], 'layouts', '404', 'index.html'), File::RDONLY)
        ]
      end

    else

      # Redirect to / to maintain relative paths
      [
        301,
        {
          'Location' => File.join(req.path, '/')
        },
        []
      ]
    end
  }

else
  require 'rubygems'
  require 'bundler'

  Bundler.require(:default, :development)

  require_relative './doc-site/app/app'

  ENV['ASSET_ENV'] = 'development'

  run DocSite::App
end
