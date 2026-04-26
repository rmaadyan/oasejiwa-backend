import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { BookingModule } from '../booking/booking.module';

@Module({
    imports:[
        PrismaModule,
        AuthModule,
        BookingModule,
    ],
    providers: [AdminService],
    controllers: [AdminController]
})
export class AdminModule {}
