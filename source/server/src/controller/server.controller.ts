import { Controller, Get } from '@nestjs/common';
import { ServerProvider } from 'src/provider/server.provider';

@Controller('/api/server')
export class ServerController {
  constructor(private readonly serverProvider: ServerProvider) {}

  @Get()
  async getServerInfo() {
    const data = await this.serverProvider.getServerInfo();
    return {
      code: 200,
      data: data,
    };
  }
}
