import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CaseStatus } from '../entities/case.entity';

export class UpdateCaseDto {
  @IsOptional()
  @IsUUID()
  doctorId?: string;

  @IsOptional()
  @IsString()
  symptoms?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  testsAdvised?: string;

  @IsOptional()
  status?: CaseStatus;
}