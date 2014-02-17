require 'rubygems'
require 'bundler'

Bundler.require

require 'sinatra/base'
require 'sprockets'
require 'sprockets-helpers'

require './app'

run WebTemplates
