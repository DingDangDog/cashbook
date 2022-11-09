import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Flow, FlowSchema } from './schema/flow.schema';

import { FlowController } from './controller/flow.controller';
import { FlowProvider } from './provider/flow.provider';

@Module({
  imports: [
    // 默认使用本地连接
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dddCashbook'),
    MongooseModule.forFeature([{ name: Flow.name, schema: FlowSchema }]),
  ],
  controllers: [AppController, FlowController],
  providers: [AppService, FlowProvider],
})
export class AppModule {}
