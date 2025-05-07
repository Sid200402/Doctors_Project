import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
export class OtpDto {
  @IsNotEmpty()
  PhoneNumber: string;

  @IsNotEmpty()
  otp: number;
}
export class SigninDto {
  @IsNotEmpty()
  phoneNumber: string;
}
export class AdminSigninDto {
  @IsNotEmpty()
  loginId: string;

  @IsOptional()
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
