#!/usr/bin/env rackup
# encoding: utf-8

require 'rubygems'
require 'bundler'

Bundler.require(:default, :development)

Dotenv.load

require File.expand_path('../app', __FILE__)
run App.app
