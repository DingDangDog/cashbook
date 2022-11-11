import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Flow, FlowSchema } from './schema/flow.schema';
import { Book, BookSchema } from './schema/book.schema';

import { FlowController } from './controller/flow.controller';
import { FlowProvider } from './provider/flow.provider';
import { BookController } from './controller/book.controller';
import { BookProvider } from './provider/book.provider';

@Module({
  imports: [
    // 默认使用本地连接
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dddCashbook'),
    MongooseModule.forFeature([
      { name: Flow.name, schema: FlowSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  controllers: [AppController, FlowController, BookController],
  providers: [AppService, FlowProvider, BookProvider],
})
export class AppModule {}
