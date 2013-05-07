require 'rubygems'
require 'bundler'

Bundler.setup

require "rack/jekyll"

map "/mapbox.js" do
  run Rack::Jekyll.new(:auto => true)
end
