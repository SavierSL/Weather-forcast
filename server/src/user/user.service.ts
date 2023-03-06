import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetAccessToken } from './dto/create-user.dto';
import { Request } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class UserService {
  async getAccessToken(code: GetAccessToken) {
    const postData = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code,
    };

    const client = await axios.post(
      'https://github.com/login/oauth/access_token',
      postData,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return client.data;
  }

  async getUserData(req: Request) {
    req.get('Authorization');

    return await axios
      .get('https://api.github.com/user', {
        headers: {
          Authorization: req.get('Authorization'),
        },
      })
      .then((res) => res.data)
      .catch((e) => {
        return e;
      });
  }
}
