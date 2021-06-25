import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('healthcheck')
  findAll(): string {
    return 'ok';
  }
}
