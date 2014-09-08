#!/usr/bin/env rackup
# encoding: utf-8

require 'rubygems'
require 'bundler'

Bundler.require

require 'compass'

require_relative './app/app'

run WebTemplates::App
