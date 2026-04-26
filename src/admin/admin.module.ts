import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryProvider } from './config/cloudinary.config';
import { CloudinaryService } from './cloudinary.service';

@Module({
    imports:[
        PrismaModule,
        AuthModule,
    ],
    providers: [AdminService, CloudinaryProvider, CloudinaryService],
    controllers: [AdminController]
})
export class AdminModule {}
