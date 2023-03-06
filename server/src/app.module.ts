import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { WeatherService } from './weather/weather.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [WeatherModule, UserModule],
  controllers: [AppController],
  providers: [AppService, WeatherService],
})
export class AppModule {}
