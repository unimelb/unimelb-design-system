#!/usr/bin/env rackup
# encoding: utf-8

require 'rubygems'
require 'bundler'

Bundler.require

require 'compass'

require_relative './demo-site/app/app'

if ENV["RACK_ENV"] == 'production'
  use Rack::Auth::Basic, "Protected Area" do |username, password|
    username == 'uom' and password == 'webtemplates2014'
  end
end

run WebTemplates::App
