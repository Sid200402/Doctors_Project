import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
export class PaginationDto {
  @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(10)
    limit: number;

  @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset: number;
  
    @IsOptional()
    keyword?: string;
  
  }