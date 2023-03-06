import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetAccessToken } from './dto/create-user.dto';
import { Request } from 'express';
@Injectable()
export class UserService {
  async getAccessToken(code: GetAccessToken) {
    const postData = {
      client_id: '0cc16f60158be8d1cc39',
      client_secret: 'e15a410716088db6fc1a65964d9f96a260f15d55',
      code: code,
    };
    console.log(code);
    const client = await axios.post(
      'https://github.com/login/oauth/access_token',
      postData,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    console.log(client.data);
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
        console.log(e);
      });
  }
}
