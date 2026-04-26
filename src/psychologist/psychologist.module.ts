import { Module } from '@nestjs/common';
import { PsychologistController } from './psychologist.controller';
import { PsychologistService } from './psychologist.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PsychologistController],
    providers: [PsychologistService],
})
export class PsychologistModule {}