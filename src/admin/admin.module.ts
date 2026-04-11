import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports:[
        PrismaModule,
        AuthModule,
    ],
    providers: [AdminService],
    controllers: [AdminController]
})
export class AdminModule {}
