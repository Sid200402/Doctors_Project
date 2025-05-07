import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CommonPaginationDto {
  @IsOptional() 
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  limit: number;
  @IsOptional() 
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional() 
  @IsString()
  @MinLength(0)
  @MaxLength(100)
  keyword: string;
}
