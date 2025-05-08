import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export enum HistoryType {
  ILLNESS = 'ILLNESS',
  SURGERY = 'SURGERY',
  ALLERGY = 'ALLERGY',
  VACCINATION = 'VACCINATION',
  CHRONIC_CONDITION = 'CHRONIC_CONDITION',
  MEDICATION = 'MEDICATION',
  FAMILY_HISTORY = 'FAMILY_HISTORY',
  OTHER = 'OTHER',
}

export class CreateMedicalHistoryDto {
  @IsNotEmpty()
  @IsUUID()
  patientId: string;

  @IsOptional()
  @IsDateString()
  diagnosisDate?: string;

  @IsOptional()
  @IsString()
  treatmentDetails?: string;

  @IsNotEmpty()
  @IsString()
  historyType: HistoryType;

  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsOptional()
  @IsString()
  notes?: string;
}