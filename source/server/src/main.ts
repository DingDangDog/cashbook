import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerProvider } from './provider/server.provider';
import { DistProvider } from './provider/dist.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverProvider = app.get(ServerProvider);
  await serverProvider.initServerInfo();
  const distProvider = app.get(DistProvider);
  await distProvider.initDist();
  await app.listen(3000);
}
bootstrap();
