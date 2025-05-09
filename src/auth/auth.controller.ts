import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Ip, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {  RegisterDto, } from './dto/register.dto';
import { AdminSigninDto, LoginDto, OtpDto, SigninDto,  } from './dto/login.dto';
import { Roles } from './decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/enum';
import { CurrentUser } from './decorator/current-user.decorator';
import { Account } from 'src/account/entities/account.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

import { RolesGuard } from './guards/roles.guard';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
   ) 
   {}




  @Post('verify')
  verifyOtp(@Body() dto: OtpDto) {    
    return this.authService.verifyOtp(dto);
  }
  @Post('phone/otp')
  sentOtp(@Body() dto: SigninDto) {
    return this.authService.sentOtp(dto);
  }

  @Post('admin/login')
  async adminlogin(@Body() dto: LoginDto) {
    return this.authService.signIn(dto);
  }
  @Post('verify')
  staffverifyOtp(@Body() dto: OtpDto) {    
    return this.authService.staffverifyOtp(dto);
  }
  @Post('staff/login')
  async stafflogin(@Body() dto: LoginDto) {
    return this.authService.staffLogIn(dto);
  }


 
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('add-doctor')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.ADMIN)
async addDoctor(
  @Body() dto: CreateDoctorDto,
  @CurrentUser() user: Account,
): Promise<Doctor> {
  return this.authService.createDoctor(dto, user.id);
}

@Post('doctor/verify')
  doctorverifyOtp(@Body() dto: OtpDto) {    
    return this.authService.doctorverifyOtp(dto);
  }
  @Post('Doctor/login')
  async doctorlogin(@Body() dto: LoginDto) {
    return this.authService.doctorLogIn(dto);
  }




  }
































// @Post('login')
// async login (@Body() Dto:LoginDto){
//   return this.authService.login(Dto)
