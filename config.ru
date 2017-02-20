require 'bundler/setup'

require 'sinatra/base'

class Application < Sinatra::Base

  get '/' do
    erb :index
  end

end

run Application