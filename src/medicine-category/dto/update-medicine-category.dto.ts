import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { MedicineCategoryStatus } from '../../enum';

export class UpdateMedicineCategoryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(MedicineCategoryStatus)
  status: MedicineCategoryStatus;
}
