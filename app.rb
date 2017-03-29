require 'sinatra'
require 'faraday'

CINEMACITY_URI = 'http://www.cinemacity.cz/'

cache = {}

get '/proxy/*' do
  url = CINEMACITY_URI + params['splat'].first
  p url

  return cache[url] if cache[url]

  res = Faraday.get(url)

  cache[url] = res.body

  res.body
end

get '*' do
  send_file File.join(settings.public_folder, 'index.html')
end
