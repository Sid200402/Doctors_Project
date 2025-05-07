import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Account } from 'src/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorDetail } from 'src/doctor-details/entities/doctor-detail.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DefaultStatus, UserRole } from 'src/enum';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { OtpDto, SigninDto } from './dto/login.dto';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { RegisterDto } from './dto/register.dto';
import { Patient } from 'src/patient/entities/patient.entity';

export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    @InjectRepository(DoctorDetail)
    private readonly doctorrepo: Repository<DoctorDetail>,
    @InjectRepository(UserDetail)
    private readonly userrepo: Repository<UserDetail>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Patient) private readonly patientRepo: Repository<Patient>,
  ) {}

  async verifyOtp(dto: OtpDto) {
    const user = await this.getUserByPhoneNumber(dto.PhoneNumber);
    if (!user) {
      throw new NotFoundException('User not found with this Phone Number!');
    }

    const sentOtp = await this.cacheManager.get(dto.PhoneNumber);
    if (!sentOtp) {
      throw new UnauthorizedException('OTP expired or not found!');
    }
    if (dto.otp !== sentOtp) {
      throw new UnauthorizedException('Invalid OTP!');
    }
    const token = await APIFeatures.assignJwtToken(user.id, this.jwtService);
    await this.cacheManager.del(dto.PhoneNumber);
    return { token, accountId: user.id };
  }

  async sentOtp(dto: SigninDto) {
  //   const otp = Math.floor(1000 + Math.random() * 9000);
    const otp=1234;
    this.cacheManager.set(dto.phoneNumber, otp, 600 * 1000);
      // await this.nodeMailerService.sendOtpInEmail(dto.email, otp);
    return {
     
      phoneNumber: dto.phoneNumber,
      success: true,
      message: 'OTP sent succesfully',
    };
  }

  private getUserByPhoneNumber = async (
    phoneNumber: string,
  ): Promise<Account | null> => {
   
    const result = await this.repo
      .createQueryBuilder('account')
      .where('account.PhoneNumber = :phoneNumber', { phoneNumber })
      .getOne();
    if (!result) {
      throw new UnauthorizedException('Account not found!');
    }
    return result;
  };

  async register(Dto: RegisterDto): Promise<Account> {
    const existingUser = await this.repo.findOne({
      where: { PhoneNumber: Dto.PhoneNumber },
    });
    if (existingUser) {
      throw new ConflictException('User with this ph number exists');
    }
    const payload = this.repo.create({
      PhoneNumber: Dto.PhoneNumber,
      email: Dto.email,
      roles: Dto.roles,
      status: DefaultStatus.ACTIVE,
      
    });
    const savedAccount = await this.repo.save(payload);
    if (Dto.roles === UserRole.PATIENT) {
      const doctorDetail = this.patientRepo.create({
        email: Dto.email,
    
       accountId: savedAccount.id,
      });
      await this.patientRepo.save(doctorDetail);
    } else if (Dto.roles === UserRole.USER) {
      const UserDetail = this.userrepo.create({
        email: Dto.email,
        accountId: savedAccount.id,
      });
      await this.userrepo.save(UserDetail);
    }
    return savedAccount;
  }
}

