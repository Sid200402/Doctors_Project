import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Ip } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {  RegisterDto, } from './dto/register.dto';
import { AdminSigninDto, OtpDto, SigninDto,  } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}




  @Post('verify')
  verifyOtp(@Body() dto: OtpDto) {    
    return this.authService.verifyOtp(dto);
  }
  @Post('phone/otp')
  sentOtp(@Body() dto: SigninDto) {
    return this.authService.sentOtp(dto);
  }

 
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }



  }
































// @Post('login')
// async login (@Body() Dto:LoginDto){
//   return this.authService.login(Dto)
