import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEnum, IsArray } from 'class-validator';

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
  takingPsychiatricMeds!: boolean;

  @IsEnum(ProblemDuration)
  problemDuration!: ProblemDuration;

  @IsEnum(SymptomFrequency)
  symptomFrequency!: SymptomFrequency;

  @IsEnum(DailyImpact)
  dailyImpact!: DailyImpact;

  @IsBoolean()
  hasSimilarHistory!: boolean;

  @IsOptional()
  @IsString()
  similarHistoryDetail?: string;

  @IsBoolean()
  hasFamilyHistory!: boolean;

  @IsOptional()
  @IsString()
  familyHistoryDetail?: string;

  @IsBoolean()
  hasMedicalTreatment!: boolean;

  @IsOptional()
  @IsString()
  medicalTreatmentDetail?: string;

  @IsBoolean()
  hasTraumaticEvent!: boolean;

  @IsOptional()
  @IsString()
  traumaticEventDetail?: string;

  @IsEnum(SleepQuality)
  sleepQuality!: SleepQuality;

  @IsEnum(SelfHarmThoughts)
  selfHarmThoughts!: SelfHarmThoughts;

  @IsBoolean()
  usesAddictiveSubstances!: boolean;

  @IsOptional()
  @IsString()
  addictiveSubstancesDetail?: string;

  @IsEnum(EatingPattern)
  eatingPattern!: EatingPattern;

  @IsEnum(ExerciseFrequency)
  exerciseFrequency!: ExerciseFrequency;

  @IsEnum(StressLevel)
  stressLevel!: StressLevel;

  @IsArray()
  @IsString({ each: true })
  consultationGoals!: string[];

  @IsEnum(TherapyPreference)
  therapyPreference!: TherapyPreference;
}
