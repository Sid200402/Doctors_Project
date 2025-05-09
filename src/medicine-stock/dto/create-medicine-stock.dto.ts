// src/medicine-stock/dto/medicine-stock.dto.ts

import { IsUUID, IsInt, IsOptional, IsString, IsDateString, IsEnum, IsBoolean, IsNotEmpty, Min, IsDate, IsNumber } from 'class-validator';
import { StockStatus } from '../../enum';


export class MedicineStockDto {
  @IsUUID()
  medicineId: string;

  @IsInt()
  quantity: number;

  @IsOptional()
  @IsInt()
  consumedQuantity?: number;

  @IsOptional()
  @IsDate()
  expiryDate?: Date;

  @IsOptional()
  @IsString()

  batchNumber?: string;

  @IsOptional()
  @IsString()
  vendorName?: string;

  @IsEnum(StockStatus)
  status: StockStatus;


  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}



export class UpdateStockDto {
  @IsNotEmpty()
  @IsString()
  stockId: string;

  @IsNotEmpty()
  @IsString()
  batchNumber: string;
  @IsNotEmpty()
  @IsDate()
  expiryDate: Date;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  vendorName?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

}

export class DecreaseStockDto {
  @IsNotEmpty()
  @IsString()
  stockId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateBatchVendorInfoDto {
  @IsNotEmpty()
  @IsString()
  stockId: string;

  @IsNotEmpty()
  @IsString()
  batchNumber: string;

  @IsNotEmpty()
  @IsString()
  vendorName: string;

  @IsNotEmpty()
  @IsDate()
  expiryDate: Date;
}
