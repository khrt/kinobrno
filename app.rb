require 'sinatra'
require 'faraday'
require 'digest'

CINEMACITY_URI = 'http://www.cinemacity.cz/'

# TODO: move cache to Memcached or Redis
cache = {}

get '/proxy/*' do
  url = CINEMACITY_URI + request.fullpath.sub(/\/proxy\//, '')
  hexdigest = Digest::SHA256.hexdigest(url)

  return [200, { 'Content-Type' => 'application/x-json', }, cache[hexdigest]] if cache[hexdigest]

  begin
    data = Faraday.get(url).body
  rescue Exception
    return 500
  end

  # Will never expire
  cache[hexdigest] = data

  [200, { 'Content-Type' => 'application/x-json', }, data]
end

get '*' do
  send_file File.join(settings.public_folder, 'index.html')
end
