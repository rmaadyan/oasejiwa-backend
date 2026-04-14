import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { LayananService } from './layanan.service';

@Controller('layanan')
export class LayananController {
  constructor(private readonly layananService: LayananService) {}

  @Get()
  findAll() {
    return this.layananService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.layananService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.layananService.update(+id, data);
  }
}