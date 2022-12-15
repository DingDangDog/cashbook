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
import { config } from './config';

@Module({
  imports: [
    // 默认使用本地连接
    MongooseModule.forRoot(config.mongoUrl),
    MongooseModule.forFeature([
      { name: Flow.name, schema: FlowSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  controllers: [
    AppController,
    FlowController,
    BookController,
    AnalysisController,
  ],
  providers: [AppService, FlowProvider, BookProvider, AnalysisProvider],
})
export class AppModule {}
