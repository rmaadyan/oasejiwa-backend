import { Module } from '@nestjs/common';
import { TesService } from './tes.service';
import { TesController } from './tes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TesController],
  providers: [TesService],
})
export class TesModule {}