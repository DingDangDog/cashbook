import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dist, DistDocument } from 'src/schema/dist.schema';
import { DefaultData } from 'src/config/default.data';

@Injectable()
export class DistProvider {
  constructor(
    @InjectModel('Dist')
    private distModel: Model<DistDocument>,
  ) {}

  async initDist() {
    if (!(await this.distModel.findOne({ id: 1 }))) {
      await this.distModel.insertMany(DefaultData.dist);
    }
  }

  async getDistByType(type: string): Promise<Dist[]> {
    return await this.distModel.find({ type }).sort({ sort: 1 });
  }
}
