import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Server, ServerDocument } from 'src/schema/server.schema';
import { ServerDto } from 'src/types/server.dto';

@Injectable()
export class ServerProvider {
  constructor(
    @InjectModel('Server')
    private serverModel: Model<ServerDocument>,
  ) {}

  async getServerInfo(): Promise<Server> {
    return await this.serverModel.findOne({ id: 1 }).exec();
  }

  async initServerInfo(): Promise<Server> {
    const server = await this.getServerInfo();
    if (server) {
      const serverDto: ServerDto = {
        id: server.id,
        version: server.version,
        environment: server.environment,
        createDate: server.createDate,
        startDate: new Date(),
      };
      if (process.env.CASHBOOK_VERSION) {
        serverDto.version = process.env.CASHBOOK_VERSION;
        server.version = process.env.CASHBOOK_VERSION;
      }
      if (process.env.CASHBOOK_ENVIRONMENT) {
        serverDto.environment = process.env.CASHBOOK_ENVIRONMENT;
        server.environment = process.env.CASHBOOK_ENVIRONMENT;
      }
      await this.serverModel.updateOne({ id: serverDto.id }, { ...serverDto });
    } else {
      const newServer: ServerDto = {
        id: 1,
        version: process.env.CASHBOOK_VERSION,
        environment: process.env.CASHBOOK_ENVIRONMENT,
        createDate: new Date(),
        startDate: new Date(),
      };
      const createdData = new this.serverModel(newServer);
      createdData.save();
      return createdData;
    }

    return server;
  }
}
