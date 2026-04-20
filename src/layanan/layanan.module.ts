import { Module } from '@nestjs/common';
import { LayananController } from './layanan.controller';
import { LayananService } from './layanan.service';

@Module({
  controllers: [LayananController],
  providers: [LayananService]
})
export class LayananModule {}
