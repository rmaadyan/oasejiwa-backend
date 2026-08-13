import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum ProblemDuration {
  LESS_THAN_1_MONTH = 'LESS_THAN_1_MONTH',
  ONE_TO_3_MONTHS = 'ONE_TO_3_MONTHS',
  THREE_TO_6_MONTHS = 'THREE_TO_6_MONTHS',
  MORE_THAN_6_MONTHS = 'MORE_THAN_6_MONTHS',
}

export enum SymptomFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  RARELY = 'RARELY',
}

export enum DailyImpact {
  NONE = 'NONE',
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
}

export enum SleepQuality {
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  DISTURBED = 'DISTURBED',
}

export enum SelfHarmThoughts {
  NEVER = 'NEVER',
  SOMETIMES = 'SOMETIMES',
  FREQUENT = 'FREQUENT',
}

export enum EatingPattern {
  REGULAR = 'REGULAR',
  IRREGULAR = 'IRREGULAR',
  OVEREATING = 'OVEREATING',
  UNDEREATING = 'UNDEREATING',
}

export enum ExerciseFrequency {
  NEVER = 'NEVER',
  RARELY = 'RARELY',
  SOMETIMES = 'SOMETIMES',
  REGULARLY = 'REGULARLY',
}

export enum StressLevel {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export enum TherapyPreference {
  DIRECTIVE = 'DIRECTIVE',
  COLLABORATIVE = 'COLLABORATIVE',
  NO_PREFERENCE = 'NO_PREFERENCE',
}

export class ConsultationFormDto {
  @IsString()
  @IsNotEmpty()
  mainReason!: string;

  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true' || value === 'yes' || value === 'Ya')
  takingPsychiatricMeds!: boolean;

  @IsEnum(ProblemDuration)
  problemDuration!: ProblemDuration;

  @IsEnum(SymptomFrequency)
  symptomFrequency!: SymptomFrequency;

  @IsEnum(DailyImpact)
  dailyImpact!: DailyImpact;

  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true' || value === 'yes' || value === 'Ya')
  hasSimilarHistory!: boolean;

  @IsOptional()
  @IsString()
  similarHistoryDetail?: string;

  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true' || value === 'yes' || value === 'Ya')
  hasFamilyHistory!: boolean;

  @IsOptional()
  @IsString()
  familyHistoryDetail?: string;

  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true' || value === 'yes' || value === 'Ya')
  hasMedicalTreatment!: boolean;

  @IsOptional()
  @IsString()
  medicalTreatmentDetail?: string;

  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true' || value === 'yes' || value === 'Ya')
  hasTraumaticEvent!: boolean;

  @IsOptional()
  @IsString()
  traumaticEventDetail?: string;

  @IsEnum(SleepQuality)
  sleepQuality!: SleepQuality;

  // 🟢 Properti tambahan untuk Konseling Pasangan
  @IsOptional()
  @IsEnum(SleepQuality)
  partnerSleepQuality?: SleepQuality;

  @IsOptional()
  @IsEnum(SelfHarmThoughts)
  selfHarmThoughts?: SelfHarmThoughts;

  @IsBoolean()
  @Transform(({ value }) => value === true || value === 'true' || value === 'yes' || value === 'Ya')
  usesAddictiveSubstances!: boolean;

  @IsOptional()
  @IsString()
  addictiveSubstancesDetail?: string;

  @IsOptional()
  @IsEnum(EatingPattern)
  eatingPattern?: EatingPattern;

  @IsOptional()
  @IsEnum(ExerciseFrequency)
  exerciseFrequency?: ExerciseFrequency;

  @IsOptional()
  @IsEnum(StressLevel)
  stressLevel?: StressLevel;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  consultationGoals?: string[];

  @IsOptional()
  @IsEnum(TherapyPreference)
  therapyPreference?: TherapyPreference;
}