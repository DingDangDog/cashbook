import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerProvider } from './provider/server.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverProvider = app.get(ServerProvider);
  await serverProvider.initServerInfo();
  await app.listen(3000);
}
bootstrap();
