import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrescriptionTemplateItemDto } from './create-prescription-template-item.dto';

export class UpdatePrescriptionTemplateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrescriptionTemplateItemDto)
  items?: CreatePrescriptionTemplateItemDto[];
}