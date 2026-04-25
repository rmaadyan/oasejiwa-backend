import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LayananModule } from './layanan/layanan.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TesModule } from './tes/tes.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    LayananModule,
    TesModule,
    UploadModule,

  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}