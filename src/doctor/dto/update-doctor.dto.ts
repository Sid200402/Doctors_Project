import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsInt, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {

    @IsOptional()
  @IsString()
  name: string;
  

  @IsString()
  designation: string;

  @IsString()
  specialization: string;

  @IsOptional()
  @IsString()
  collegeName: String; 

  @IsOptional()
  @IsInt()
  studyYear: number;



  @IsOptional()
  @IsInt()
  experienceYears: number;


  @IsOptional()
  @IsUrl()
  profilePhoto: string;  

   
}
export class PaginationDto {

    @IsOptional()
      @Type(() => Number)
      @IsNumber()
      @Min(0)
      @Max(10)
      limit: number;
  
    @IsOptional()
      @Type(() => Number)
      @IsNumber()
      @Min(0)
      offset: number;
    
      @IsOptional()
      keyword?: string;
}
