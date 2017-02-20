require 'bundler/setup'

require 'sinatra/base'
require 'multi_json'
require 'json'
require 'net/http'

class Application < Sinatra::Base

  before do
    ENV['BACKEND'] ||= 'backend'
    ENV['BACKEND_PORT'] = '8080'
  end

  get '/' do
    begin
      @config = MultiJson.load(Net::HTTP.get(ENV['BACKEND'], '/config.json', ENV['BACKEND_PORT']))
      erb :map
    rescue => e
      erb :index
    end
  end

  get '/data' do
    content_type 'application/json'
    Net::HTTP.get(ENV['BACKEND'], '/data.json', Integer(ENV['BACKEND_PORT']))
  end

end

run Application