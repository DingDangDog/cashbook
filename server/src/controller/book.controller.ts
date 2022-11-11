import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { BookProvider } from 'src/provider/book.provider';

import { CreateBookDto } from 'src/types/book.dto';

@Controller('/api/book')
export class BookController {
  constructor(private readonly bookProvider: BookProvider) {}

  @Get('/:key')
  async getBook(@Param('key') bookKey: string) {
    const data = await this.bookProvider.getBook(bookKey);
    if (data && data.length == 1) {
      return {
        code: 200,
        data: data[0],
      };
    }
    return {
      code: 333,
      message: bookKey + '用户未注册，请先注册！',
    };
  }

  @Post('/createBook')
  async createBook(@Body() createDto: CreateBookDto) {
    if (!createDto.bookKey || !createDto.bookName) {
      return {
        code: 300,
        message: '输入有误，请重新输入',
      };
    }
    const data = await this.bookProvider.createBook(createDto);
    return {
      code: 200,
      data,
    };
  }
}
