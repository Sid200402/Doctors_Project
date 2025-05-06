import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { DefaultStatus, UserRole } from 'src/enum';
import { Patient } from 'src/patient/entities/patient.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) private readonly repo:Repository<Account>,
    @InjectRepository(Patient) private readonly PatientRepo:Repository<Patient>,
  ){}

  async register(Dto: RegisterDto): Promise<Account> {
    const existingUser = await this.repo.findOne({
      where: { phoneNumber: Dto.phoneNumber },
    });
  
    if (existingUser) {
      throw new ConflictException('User with this ph number exists');
    }
  
    const encryptedPassword = await bcrypt.hash(Dto.password, 10);
    const payload = this.repo.create({
      phoneNumber: Dto.phoneNumber,
      email: Dto.email,
      password: encryptedPassword,
      roles: Dto.roles,
      status: DefaultStatus.ACTIVE,
    });
  
    const savedAccount = await this.repo.save(payload);
  
    if (Dto.roles === UserRole.PATIENT) {
      const patientDetail = this.PatientRepo.create({
        email: Dto.email,
        accountId: savedAccount.id,
      });
      await this.PatientRepo.save(patientDetail);
    }
  
    
    return savedAccount;
  }
  
}


  // private getPermissions = async (accountId: string): Promise<any> => {
  //   let result = await this.cacheManager.get('userPermission' + accountId);
  //   if (!result) {
  //     result = await this.upRepo.find({
  //       relations: ['permission', 'menu'],
  //       where: { accountId, status: true },
  //     });
  //     this.cacheManager.set(
  //       'userPermission' + accountId,
  //       result,
  //       7 * 24 * 60 * 60 * 1000,
  //     );
  //   }
  //   return result;
  // };
  // cacheManager: any;


