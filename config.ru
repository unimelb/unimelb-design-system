require 'rubygems'
require 'bundler'

Bundler.require

require 'sprockets'
require 'sprockets-helpers'
require 'html/pipeline'
require 'compass'

require './app'

run WebTemplates
