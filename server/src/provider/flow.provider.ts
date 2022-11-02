import {
    Inject,
    Injectable,
    forwardRef,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sleep } from 'src/utils/sleep';
import { Flow, FlowDocument } from 'src/schema/flow.schema';
import {
    CreateFlowDto, FlowQuery
} from 'src/types/flow.dto';


@Injectable()
export class FlowProvider {
    idLock = false;
    constructor(
        @InjectModel('Flow')
        private flowModel: Model<FlowDocument>
    ) { }

    async create(
        createFlowDto: CreateFlowDto
    ): Promise<Flow> {
        const createdData = new this.flowModel(createFlowDto);
        const newId = await this.getNewId();
        createdData.id = newId;
        const res = createdData.save();
        return res;
    }

    async getAll(
        query: FlowQuery
    ): Promise<Flow[]> {
        return await this.flowModel.find()
          .sort({ id: 1 })
          .exec();
    }


    async getNewId() {
        while (this.idLock) {
            await sleep(10);
        }
        this.idLock = true;
        const maxObj = await this.flowModel.find({}).sort({ id: -1 }).limit(1);
        let res = 1;
        if (maxObj.length) {
            res = maxObj[0].id + 1;
        }
        this.idLock = false;
        return res;
    }
}
