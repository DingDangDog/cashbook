import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Flow, FlowSchema } from './schema/flow.schema';
import { FlowController } from './controller/flow.controller';
import { FlowProvider } from './provider/flow.provider';

import { Book, BookSchema } from './schema/book.schema';
import { BookController } from './controller/book.controller';
import { BookProvider } from './provider/book.provider';

import { AnalysisController } from './controller/analysis.controller';
import { AnalysisProvider } from './provider/analysis.provider';

import { Server, ServerSchema } from './schema/server.schema';
import { ServerController } from './controller/server.controller';
import { ServerProvider } from './provider/server.provider';

import { Dist, DistSchema } from './schema/dist.schema';
import { DistController } from './controller/dist.controller';
import { DistProvider } from './provider/dist.provider';

import { config } from './config';

@Module({
  imports: [
    // 默认使用本地连接
    MongooseModule.forRoot(config.mongoUrl),
    MongooseModule.forFeature([
      { name: Flow.name, schema: FlowSchema },
      { name: Book.name, schema: BookSchema },
      { name: Server.name, schema: ServerSchema },
      { name: Dist.name, schema: DistSchema },
    ]),
  ],
  controllers: [
    AppController,
    FlowController,
    BookController,
    AnalysisController,
    ServerController,
    DistController,
  ],
  providers: [
    AppService,
    FlowProvider,
    BookProvider,
    AnalysisProvider,
    ServerProvider,
    DistProvider,
  ],
})
export class AppModule {}
