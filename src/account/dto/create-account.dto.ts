import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UserRole } from "src/enum";

export class CreateAccountDto {
   
      
        @IsNotEmpty()
        @MinLength(10)
        @MaxLength(14)
        phoneNumber: string;
      
        @IsNotEmpty()
        @IsString()
        @MinLength(5)
        @MaxLength(100)
        password: string;
        
        @IsEmail()
        @IsNotEmpty()
        email: string; 
      
      
      
        @IsOptional()
        @IsDate()
        dob: Date;
      
        @IsNotEmpty()
        @IsEnum(UserRole)
        roles: UserRole;
      }

