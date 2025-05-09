import { IsNotEmpty, IsUUID, IsOptional, Length } from 'class-validator';

export class CreatePrescribedMedicineDto {
  @IsNotEmpty()
  @IsUUID()
  prescriptionId: string;

  @IsOptional()
  @Length(1, 100)
  disease: string;

  @IsNotEmpty()
  @IsUUID()
  medicineId: string;

  @IsNotEmpty()
  @Length(1, 100)
  dosage: string;

  @IsNotEmpty()
  @Length(1, 100)
  frequency: string;

  @IsNotEmpty()
  @Length(1, 100)
  duration: string;

  @IsOptional()
  @Length(1, 100)
  route: string;

  @IsOptional()
  instructions: string;
}
