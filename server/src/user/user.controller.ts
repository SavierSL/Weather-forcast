import { Body, Controller, Post } from '@nestjs/common';
import { Get, Query, Req } from '@nestjs/common/decorators';
import { GetAccessToken } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAccessToken(@Query('code') code: GetAccessToken) {
    return this.userService.getAccessToken(code);
  }
  @Get('/getUser')
  getUserData(@Req() req: Request) {
    return this.userService.getUserData(req);
  }
}
