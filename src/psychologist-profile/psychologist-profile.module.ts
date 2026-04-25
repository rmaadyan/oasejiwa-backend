import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PsychologistProfileController } from './psychologist-profile.controller';
import { PsychologistProfileService } from './psychologist-profile.service';

@Module({
  imports: [PrismaModule],
  controllers: [PsychologistProfileController],
  providers: [PsychologistProfileService],
})
export class PsychologistProfileModule {}