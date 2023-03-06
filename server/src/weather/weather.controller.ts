import { Body, Controller, Post } from '@nestjs/common';
import { FindCityName } from './dto/create-weather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}
  @Post()
  getWeather(@Body() body: FindCityName): any {
    return this.weatherService.findCurrentWeather(body);
  }
}
