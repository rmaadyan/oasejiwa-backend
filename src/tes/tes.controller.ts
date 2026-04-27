import { Controller, Get, Post, Delete, Patch, Param, Body } from '@nestjs/common';
import { TesService } from './tes.service';
import { CreateTesDto, UpdateTesDto } from './tes.dto';

@Controller('tes')
export class TesController {
  constructor(private readonly tesService: TesService) {}

  @Post() create(@Body() dto: CreateTesDto) {
    return this.tesService.create(dto);
  }

  @Get() findAll() {
    return this.tesService.findAll();
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.tesService.findOne(+id);
  }

  // new endpoint for update
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateTesDto) {
    return this.tesService.update(+id, dto);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.tesService.remove(+id);
  }
}