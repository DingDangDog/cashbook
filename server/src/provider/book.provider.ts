import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sleep } from 'src/utils/sleep';
import { Book, BookDocument } from 'src/schema/book.schema';
import { CreateBookDto } from 'src/types/book.dto';

@Injectable()
export class BookProvider {
  idLock = false;
  constructor(
    @InjectModel('Book')
    private bookModel: Model<BookDocument>,
  ) {}

  async getBook(bookKey: string): Promise<Book[]> {
    return await this.bookModel.find({ bookKey: bookKey }).exec();
  }

  async createBook(createDto: CreateBookDto): Promise<Book> {
    const createdData = new this.bookModel(createDto);
    const newId = await this.getNewId();
    createdData.id = newId;
    createdData.createDate = new Date();
    const res = createdData.save();
    return res;
  }

  async getNewId() {
    while (this.idLock) {
      await sleep(10);
    }
    this.idLock = true;
    const maxObj = await this.bookModel
      .find({})
      .sort({ id: -1 })
      .limit(1)
      .exec();
    let res = 1;
    if (maxObj.length) {
      res = maxObj[0].id + 1;
    }
    this.idLock = false;
    return res;
  }
}
