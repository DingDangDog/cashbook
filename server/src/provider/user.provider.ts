import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sleep } from 'src/utils/sleep';
import { User, UserDocument } from 'src/schema/user.schema';
import { CreateUserDto } from 'src/types/user.dto';

@Injectable()
export class UserProvider {
  idLock = false;
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {}

  async getUser(userKey: string): Promise<User[]> {
    return await this.userModel.find({ userKey: userKey }).exec();
  }

  async createUser(createDto: CreateUserDto): Promise<User> {
    const createdData = new this.userModel(createDto);
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
    const maxObj = await this.userModel
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
