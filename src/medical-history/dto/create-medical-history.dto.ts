import { IsEnum, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { MedicalHistoryType } from '../../enum';

export class CreateMedicalHistoryDto {
  @IsUUID()
  @IsOptional()
  patientId?: string;

  @IsEnum(MedicalHistoryType)
  type: MedicalHistoryType;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsDateString()
  occurredOn?: string;
}
