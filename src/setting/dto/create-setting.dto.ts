

import { IsOptional, IsString, IsEmail, Length } from 'class-validator';

export class CreateSettingDto {



  @IsOptional()
  @IsString()
  @Length(0, 50)
  title: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  desc: string;

  @IsOptional()
  @IsEmail()
  @Length(0, 50)
  email: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  fbLink: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  instaLink: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  twiterLink: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  printrestLink: string;

  @IsOptional()
  @IsString()
  @Length(0, 14)
  callUs: string;

  @IsOptional()
  @IsString()
  @Length(0, 14)
  callNumber: string;

  @IsOptional()
  @IsString()
  @Length(0, 14)
  suppNumber?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  address: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @IsString()
  logoPath: string;

  @IsOptional()
  @IsString()
  @Length(0, 250)
  workingTime?: string;

  @IsOptional()
  @IsString()
  @Length(0, 250)
  workingDays: string;
}

