import { Module } from '@nestjs/common';
import { PsychologistController } from './psychologist.controller';
import { PsychologistService } from './psychologist.service';
import { EmailModule } from '../email/email.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [EmailModule, PrismaModule],
    controllers: [PsychologistController],
    providers: [PsychologistService],
})
export class PsychologistModule {}