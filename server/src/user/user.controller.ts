import { Controller } from '@nestjs/common';
import { Get, Query, Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { GetAccessToken } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAccessToken(@Query('code') code: GetAccessToken) {
    return this.userService.getAccessToken(code);
  }
  @Get('/user-data')
  getUserData(@Req() req: Request) {
    return this.userService.getUserData(req);
  }
}
