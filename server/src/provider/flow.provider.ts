import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sleep } from 'src/utils/sleep';
import { Flow, FlowDocument } from 'src/schema/flow.schema';
import { CreateFlowDto, UpdateFlowDto, FlowQuery } from 'src/types/flow.dto';
import { Page } from 'src/types/common/page.dto';

@Injectable()
export class FlowProvider {
  idLock = false;
  constructor(
    @InjectModel('Flow')
    private flowModel: Model<FlowDocument>,
  ) {}

  async getPage(query: FlowQuery): Promise<Page<Flow>> {
    const and = [];

    and.push({ bookKey: { $eq: query.bookKey } });
    if (query.startDay) {
      and.push({ day: { $gte: query.startDay } });
    }
    if (query.endDay) {
      and.push({ day: { $lte: query.endDay } });
    }
    if (query.type) {
      and.push({ type: { $eq: query.type } });
    }
    if (query.payType) {
      and.push({ payType: { $eq: query.payType } });
    }
    if (query.id) {
      and.push({ id: { $eq: query.id } });
    }

    if (query.name) {
      and.push({ name: { $regex: query.name } });
    }
    if (query.description) {
      and.push({ description: { $regex: query.description } });
    }
    const quertOption = and.length > 0 ? { $and: and } : {};

    // console.log(JSON.stringify(quertOption));
    const data: Flow[] = await this.flowModel
      .find(quertOption)
      .sort({ day: -1 })
      .skip(query.pageSize * query.pageNum - query.pageSize)
      .limit(query.pageSize)
      .exec();

    // 单独查询符合条件的数据总数
    const total = await this.flowModel.count(quertOption).exec();
    const page = new Page<Flow>();
    page.pageData = data;
    page.pageSize = data.length;
    page.totalCount = total;
    page.totalPage = Math.ceil(
      total > query.pageSize ? total / query.pageSize : 1,
    );
    page.pageNum = parseInt(query.pageNum as any);
    return page;
  }

  async create(createFlowDto: CreateFlowDto): Promise<Flow> {
    const createdData = new this.flowModel(createFlowDto);
    const newId = await this.getNewId();
    createdData.id = newId;
    const res = createdData.save();
    return res;
  }

  async update(id: number, updateFlowDto: UpdateFlowDto) {
    const res = this.flowModel.updateOne({ id }, { ...updateFlowDto });
    return res;
  }

  async delete(id: number, bookKey: number) {
    const deleteO: Flow = await this.getOneByIdAndBook(id, bookKey);
    const data = this.flowModel.deleteOne({ id: deleteO.id });
    return data;
  }

  async getAll(query: FlowQuery): Promise<Flow[]> {
    return await this.flowModel.find().sort({ day: -1 }).exec();
  }

  async getOneByIdAndBook(id: number, bookKey: number): Promise<Flow> {
    return await this.flowModel
      .findOne({ id: id, bookKey: bookKey })
      .sort({ day: -1 })
      .exec();
  }

  async getNewId() {
    while (this.idLock) {
      await sleep(10);
    }
    this.idLock = true;
    const maxObj = await this.flowModel
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
