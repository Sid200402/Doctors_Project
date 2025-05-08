import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePrescriptionTemplateItemDto {
  @IsOptional()
  @IsUUID()
  medicineId?: string;

  @IsOptional()
  @IsString()
  medicineName?: string;

  @IsNotEmpty()
  @IsString()
  dosage: string;

  @IsNotEmpty()
  @IsString()
  frequency: string;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsOptional()
  @IsString()
  route?: string;

  @IsOptional()
  @IsString()
  instructions?: string;
}