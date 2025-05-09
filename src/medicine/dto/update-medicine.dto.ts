import { IsEnum, IsOptional, IsString, IsUUID, IsBoolean, IsInt } from 'class-validator';
import { MedicineForm } from '../../enum';

export class UpdateMedicineDto {
  @IsOptional()
  @IsString()
  composition: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsUUID()
  categoryId: string;

  @IsEnum(MedicineForm)
  @IsOptional()
  form: MedicineForm;

  @IsOptional()
  @IsString()
  strength: string;

  @IsOptional()
  @IsString()
  dosageInstructions: string;

  @IsOptional()
  @IsString()
  sideEffects: string;

  @IsOptional()
  @IsString()
  contraindications: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  manufacturer: string;

  @IsOptional()
  @IsInt()
  minimumStockLevel: number;
}



