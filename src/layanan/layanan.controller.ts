import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LayananService } from './layanan.service';

@Controller('layanan')
export class LayananController {
  constructor(private readonly layananService: LayananService) {}

  @Get()
  findAll() {
    return this.layananService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.layananService.findOne(+id);
  }

  @Post()
  create(@Body() data: any) {
    return this.layananService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.layananService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.layananService.remove(+id);
  }
}