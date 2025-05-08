import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrescribedMedicineDto } from './create-prescription.dto';

export class UpdatePrescriptionDto {
  @IsOptional()
  @IsUUID()
  doctorId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrescribedMedicineDto)
  prescribedMedicines?: CreatePrescribedMedicineDto[];
}
