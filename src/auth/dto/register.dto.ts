import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { UserRole } from 'src/enum';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEnum(UserRole, { message: '' })
  roles: UserRole;
}