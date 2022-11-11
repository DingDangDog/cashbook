import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UserProvider } from 'src/provider/user.provider';

import { CreateUserDto } from 'src/types/user.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userProvider: UserProvider) {}

  @Get('/:key')
  async getUser(@Param('key') userKey: string) {
    const data = await this.userProvider.getUser(userKey);
    if (data && data.length == 1) {
      return {
        code: 200,
        data: data[0],
      };
    }
    return {
      code: 333,
      message: userKey + '用户未注册，请先注册！',
    };
  }

  @Post()
  async createUser(@Body() createDto: CreateUserDto) {
    const data = this.userProvider.createUser(createDto);

    return {
      code: 200,
      data,
    };
  }
}
