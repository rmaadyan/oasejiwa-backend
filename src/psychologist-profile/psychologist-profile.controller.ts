import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PsychologistProfileService } from './psychologist-profile.service';
import { UpdatePsychologistProfileDto } from './dto/update-psychologist-profile.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('psychologist')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PSYCHOLOGIST')
export class PsychologistProfileController {
  constructor(
    private readonly psychologistProfileService: PsychologistProfileService,
  ) {}

  @Get('profile')
  getMe(@CurrentUser() user: any) {
    return this.psychologistProfileService.getMe(user);
  }

  @Put('profile')
  @UseInterceptors(FileInterceptor('photo')) // 👈 Tambahkan ini untuk menangkap file 'photo'
  updateMe(
    @CurrentUser() user: any,
    @Body() dto: UpdatePsychologistProfileDto,
    @UploadedFile() file?: Express.Multer.File, // 👈 Tambahkan ini
  ) {
    return this.psychologistProfileService.updateMe(user, dto, file);
  }
}