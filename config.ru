require 'sinatra'
require 'json'
require 'pusher'

Pusher.app_id = '35601'
Pusher.key = 'bd45d2f7ca11c6ced15e'
Pusher.secret = '7e9f6b9c0d79d2afc994'

post '/pusher/hook' do
  'Hello Post World'
end

get '/' do
  send_file 'index.html'
end

post '/pusher/auth' do
  auth = Pusher[params[:channel_name]].authenticate(params[:socket_id])
  auth.to_json
end
