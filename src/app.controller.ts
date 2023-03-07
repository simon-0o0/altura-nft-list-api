import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetMintsDTO } from './dto/getMints.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('collections')
  async getCollections() {
    return this.appService.getCollections();
  }

  @Post('get-mints')
  async getMints(@Body() dto: GetMintsDTO) {
    return this.appService.getMints(dto);
  }
}
