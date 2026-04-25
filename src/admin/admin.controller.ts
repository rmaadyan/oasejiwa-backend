import { Body, Controller, Post, UseGuards, Get, Param, Patch, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreatePsychologistDto } from './dto/create-psychologist.dto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { multerConfig } from './config/upload.config';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle() 
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
    constructor(private adminService: AdminService){}

    @Post('psychologists')
    @UseInterceptors(FileInterceptor('avatar', multerConfig))
    createPsychologist(
        @Body('data') rawData: string,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const dto = JSON.parse(rawData) as CreatePsychologistDto;
        return this.adminService.createPsychologist(dto, file);
    }

    @Get('psychologists')
    getAllPsychologists() {
        return this.adminService.getAllPsychologists();
    }

    @Get('psychologists/:id')
    getPsychologistById(@Param('id') id: string) {
        return this.adminService.getPsychologistById(id);
    }

    @Patch('psychologists/:id')
    @UseInterceptors(FileInterceptor('avatar', multerConfig))
    updatePsychologist(
        @Param('id') id: string,
        @Body('data') rawData: string,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const dto = JSON.parse(rawData) as UpdatePsychologistDto;
        return this.adminService.updatePsychologist(id, dto, file);
    }

    @Delete('psychologists/:id')
    deletePsychologist(@Param('id') id: string) {
        return this.adminService.deletePsychologist(id);
    }

    @Get('users')
    getAllUsers() {
        return this.adminService.getAllUsers();
    }

    @Get('users/:id')
    getUserById(@Param('id') id: string) {
        return this.adminService.getUserById(id);
    }

    @Delete('users/:id')
    deleteUser(@Param('id') id: string) {
        return this.adminService.deleteUser(id);
    }
}
