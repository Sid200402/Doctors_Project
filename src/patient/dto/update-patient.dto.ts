import { IsString, IsOptional, IsUUID, IsNumber, IsEnum } from 'class-validator';
import { Gender } from '../../enum';

export class UpdatePatientDto {
	@IsOptional()
	@IsString()
	fullName?: string;

	@IsOptional()
	@IsNumber()
	age?: number;

	@IsOptional()
	@IsEnum(Gender)
	gender?: Gender;

	@IsOptional()
	@IsString()
	callNumber?: string;

}
