import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePrescribedMedicineDto {
  @IsNotEmpty()
  @IsUUID()
  medicineId: string;

  @IsNotEmpty()
  @IsString()
  isease: string;

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
