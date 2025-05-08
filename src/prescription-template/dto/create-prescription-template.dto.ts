import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrescriptionTemplateItemDto } from './create-prescription-template-item.dto';

export class CreatePrescriptionTemplateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUUID()
  doctorId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrescriptionTemplateItemDto)
  items: CreatePrescriptionTemplateItemDto[];
}