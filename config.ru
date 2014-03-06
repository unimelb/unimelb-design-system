require 'rubygems'
require 'bundler'

Bundler.require

require 'sprockets'
require 'sprockets-helpers'
require 'html/pipeline'

require './app'

run WebTemplates
