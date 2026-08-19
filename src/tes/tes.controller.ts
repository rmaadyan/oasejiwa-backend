import { Controller, Get, Post, Delete, Patch, Param, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { TesService } from './tes.service';
import { CreateTesDto, UpdateTesDto, SubmitTesDto } from './tes.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('tes')
export class TesController {
  constructor(private readonly tesService: TesService) {}

  @Post() create(@Body() dto: CreateTesDto) {
    return this.tesService.create(dto);
  }

  @Get() findAll() {
    return this.tesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/submit')
  submitTes(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: SubmitTesDto,
  ) {
    return this.tesService.submitTes(user.id, +id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('results/my-results')
  getMyResults(@CurrentUser() user: any) {
    return this.tesService.findUserTesResults(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('results/user/:userId')
  getUserResults(@Param('userId') userId: string) {
    return this.tesService.findUserTesResults(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('results/all')
  getAllResults() {
    return this.tesService.findAllTesResults();
  }

  @UseGuards(JwtAuthGuard)
  @Get('results/detail/:id')
  async getTesResultDetail(@Param('id') id: string) {
    const result = await this.tesService.findTesResultById(id);
    if (!result) {
      throw new NotFoundException('Hasil tes tidak ditemukan');
    }
    return result;
  }

  @Delete('results/:id')
  removeTesResult(@Param('id') id: string) {
    return this.tesService.removeTesResult(id);
  }

  // =========================================================
  // 🟢 ROUTE KATEGORI TES (PUBLIC & ADMIN)
  // =========================================================
  @Get('categories')
  getPublicCategories() {
    return this.tesService.getPublicCategories();
  }

  @Get('categories/all')
  getAllCategories() {
    return this.tesService.getAllCategories();
  }

  @Post('categories')
  createCategory(@Body() dto: { nama: string; deskripsi?: string; status?: string; urutan?: number }) {
    return this.tesService.createCategory(dto);
  }

  @Patch('categories/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() dto: { nama?: string; deskripsi?: string; status?: string; urutan?: number },
  ) {
    return this.tesService.updateCategory(+id, dto);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string) {
    return this.tesService.deleteCategory(+id);
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