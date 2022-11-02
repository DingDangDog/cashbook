import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  /** 创建helloDDD **/
  @Get('helloDDD')
  getHelloDDD(): string {
    return this.appService.getHelloDDD();
  }
}
