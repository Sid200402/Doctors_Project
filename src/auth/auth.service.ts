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
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DefaultStatus, UserRole } from 'src/enum';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { LoginDto, OtpDto, SigninDto } from './dto/login.dto';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { RegisterDto } from './dto/register.dto';
import { Patient } from 'src/patient/entities/patient.entity';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from 'src/doctor/entities/doctor.entity';


export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    @InjectRepository(Patient) private readonly patientRepo: Repository<Patient>,
    @InjectRepository(Doctor) private readonly doctorRepo: Repository<Doctor>,


    @InjectRepository(UserPermission)
    private readonly upRepo: Repository<UserPermission>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

  ) { }

  async verifyOtp(dto: OtpDto) {
    const user = await this.getUserDetails(dto.PhoneNumber);
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

  async signIn(dto: LoginDto) {
    const admin = await this.getUserDetails(dto.email, UserRole.ADMIN);

    const isPasswordCorrect = await bcrypt.compare(dto.password, admin.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const otp = 7832; // for demo
    // const otp = Math.floor(1000 + Math.random() * 9000); // real OTP

    await this.cacheManager.set(admin.phoneNumber, otp, 10 * 60 * 1000);
    return { phoneNumber: admin.phoneNumber };
  }

  async staffverifyOtp(dto: OtpDto) {
    const user = await this.getUserDetails(dto.PhoneNumber);
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

  async staffLogIn(dto: LoginDto) {
    const staff = await this.getUserDetails(dto.email, UserRole.STAFF);

    const isPasswordCorrect = await bcrypt.compare(dto.password, staff.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const otp = 7832; // for demo
    // const otp = Math.floor(1000 + Math.random() * 9000); // real OTP

    await this.cacheManager.set(staff.phoneNumber, otp, 10 * 60 * 1000);
    return { phoneNumber: staff.phoneNumber };
  }

  async doctorverifyOtp(dto: OtpDto) {
    const user = await this.getUserDetails(dto.PhoneNumber);
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

  async doctorLogIn(dto: LoginDto) {
    const doctor = await this.getUserDetails(dto.email, UserRole.DOCTOR);

    const isPasswordCorrect = await bcrypt.compare(dto.password, doctor.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const otp = 7832; // for demo
    // const otp = Math.floor(1000 + Math.random() * 9000); // real OTP

    await this.cacheManager.set(doctor.phoneNumber, otp, 10 * 60 * 1000);
    return { phoneNumber: doctor.phoneNumber };
  }


  private async getUserDetails(
    id: string,
    role?: UserRole,
  ): Promise<Account> {
    const query = this.repo
      .createQueryBuilder('account')

      .select([
        'account.id',
        'account.email',
        'account.password',
        'account.phoneNumber',
        'account.roles',
        'account.status',

      ])
      .where('account.email = :id OR account.phoneNumber = :phoneNumber', {
        id,
        phoneNumber: id,
      });

    if (role) {
      query.andWhere('account.roles = :role', { role });
    }

    const user = await query.getOne();

    if (!user) {
      throw new UnauthorizedException('Account not found!');
    }

    return user;
  }

 async createDoctor(dto:CreateDoctorDto, createdBy: string) {
    const user = await this.repo.findOne({
      where: { email: dto.email, roles: UserRole.DOCTOR },
    });
    if (user) {
      throw new ConflictException('Login id already exists!');
    }
    const encryptedPassword = await bcrypt.hash(dto.password, 10);
    const obj = Object.assign({
      phoneNumber:dto.phoneNumber,
      email: dto.email,
      password: encryptedPassword,
      createdBy,
      roles: UserRole.DOCTOR,
    });
    const payload = await this.repo.save(obj);
    const object = Object.assign({
      email: dto.email,
      
      accountId: payload.id,
    });
    await this.doctorRepo.save(object);
    return payload;
  }






  async sentOtp(dto: SigninDto) {
    //   const otp = Math.floor(1000 + Math.random() * 9000);
    const otp = 1234;
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
      where: { phoneNumber: Dto.PhoneNumber },
    });
    if (existingUser) {
      throw new ConflictException('User with this ph number exists');
    }
    const encryptedPassword = await bcrypt.hash(Dto.password, 10);
    const payload = this.repo.create({
      phoneNumber: Dto.PhoneNumber,
      email: Dto.email,
      password: encryptedPassword,
      roles: Dto.roles,
      status: DefaultStatus.ACTIVE,

    });
    const savedAccount = await this.repo.save(payload);
    if (Dto.roles === UserRole.PATIENT) {
      const patientDetail = this.patientRepo.create({
        accountId: savedAccount.id,
      });
      await this.patientRepo.save(patientDetail);
    }
    return savedAccount;
  }


  findPermission(accountId: string) {
    return this.getPermissions(accountId);
  }

  private getPermissions = async (accountId: string): Promise<any> => {
    let result = await this.cacheManager.get('userPermission' + accountId);
    if (!result) {
      result = await this.upRepo.find({
        relations: ['permission', 'menu'],
        where: { accountId, status: true },
      });
      this.cacheManager.set(
        'userPermission' + accountId,
        result,
        7 * 24 * 60 * 60 * 1000,
      );
    }
    return result;
  };
}

