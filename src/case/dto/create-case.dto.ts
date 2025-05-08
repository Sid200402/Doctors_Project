import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CaseStatus } from '../entities/case.entity';

export class CreateCaseDto {
  @IsNotEmpty()
  @IsUUID()
  patientId: string;

  @IsOptional()
  @IsUUID()
  doctorId?: string;

  @IsNotEmpty()
  @IsString()
  symptoms: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  testsAdvised?: string;

  @IsOptional()
  status?: CaseStatus;
}