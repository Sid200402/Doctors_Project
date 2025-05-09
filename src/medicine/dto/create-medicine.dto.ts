import { IsEnum, IsOptional, IsString, IsUUID, IsBoolean, IsInt, Min, IsNotEmpty, IsNumber, Max } from 'class-validator';
import { MedicineForm, StockStatus } from '../../enum';
import { Type } from 'class-transformer';

export class CreateMedicineDto {
  @IsString()
  name: string;

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

export class PaginationDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  brand?: string;

  @IsOptional()
  categoryId?: string;

  @IsOptional()
  form?: string;

  @IsOptional()
  manufacturer?: string;

  @IsOptional()
  @IsEnum(StockStatus)
  status?: StockStatus;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}






