import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FindCityName } from './dto/create-weather.dto';
const API_KEY = '6061364b9cf161b4d97521af981d44dc';
@Injectable()
export class WeatherService {
  async findCurrentWeather(city: FindCityName) {
    const cityLatAndLon = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city.city}&appid=${API_KEY}`,
    );
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${cityLatAndLon.data[0].lat}&lon=${cityLatAndLon.data[0].lon}&units=metric&appid=${API_KEY}`,
    );
    return weatherData.data;
  }
}
