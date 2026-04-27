import { Controller, Get, Param } from '@nestjs/common';
import { PsychologistService } from './psychologist.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle() 
@Controller('psychologists')
export class PsychologistController {
    constructor(private psychologistService: PsychologistService) {}

    @Get()
    getAllPsychologists() {
        return this.psychologistService.getAllPsychologists();
    }

    @Get(':id')
    getPsychologistById(@Param('id') id: string) {
        return this.psychologistService.getPsychologistById(id);
    }
}