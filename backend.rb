require 'sinatra'
require 'json'
require 'pusher'

Pusher.app_id = '35601'
Pusher.key = 'bd45d2f7ca11c6ced15e'
Pusher.secret = '7e9f6b9c0d79d2afc994'

post '/' do
  puts 'Post Hit'
  'Hello Post World'
end

get '/' do
  puts 'Hit'
  send_file 'index.html'
end

post '/pusher/auth' do
  puts 'Pusher hit auth'
  auth = Pusher[params[:channel_name]].authenticate(params[:socket_id])
  puts auth.to_json
  auth.to_json
end
