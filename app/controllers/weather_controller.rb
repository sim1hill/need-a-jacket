
class WeatherController < ApplicationController

  def index
    @weather = Weather.new
    @weather.weather_api

  end
end
