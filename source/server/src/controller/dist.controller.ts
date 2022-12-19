import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { DistProvider } from 'src/provider/dist.provider';
import { Dist } from 'src/schema/dist.schema';

@Controller('/api/dist')
export class DistController {
  constructor(private readonly distProvider: DistProvider) {}

  @Get('/:type')
  async getDistByType(@Param('type') type: string) {
    const data: Dist[] = await this.distProvider.getDistByType(type);
    return {
      code: 200,
      data: data,
    };
  }
}
