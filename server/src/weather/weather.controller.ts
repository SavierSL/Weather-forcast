import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FindCityName } from './dto/create-weather.dto';
import { WeatherService } from './weather.service';

@Controller('home')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}
  @Post()
  getWeather(@Body() body: FindCityName): any {
    return this.weatherService.findCurrentWeather(body);
  }
  @Get(':location')
  getWeatherByAddress(@Param('location') address: string): any {
    return {
      address,
    };
  }
}
