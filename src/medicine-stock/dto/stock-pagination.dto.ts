import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { StockStatus } from '../../enum';


export class StockPaginationDto {
  @IsOptional()
  @IsUUID()
  medicineId?: string;

  @IsOptional()
  @IsString()
  batchNumber?: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsOptional()
  @IsEnum(StockStatus)
  status?: StockStatus;

  @IsOptional()
  @IsDateString()
  expiryBefore?: Date;

  @IsOptional()
  @IsDateString()
  expiryAfter?: Date;

  @IsOptional()
  @IsString()
  sortBy?: string = 'expiryDate';

  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;

  @IsOptional()
  nearExpiry?: boolean = false;

  @IsOptional()
  expired?: boolean = false;

  @IsOptional()
  lowStock?: boolean = false;
}
