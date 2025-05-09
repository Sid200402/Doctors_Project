import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PaginationDto, UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Brackets, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { StaffDetail } from 'src/staff-details/entities/staff-detail.entity';
import { UserRole } from 'src/enum';


@Injectable()
export class AccountService {
 constructor(
@InjectRepository(Account) private readonly repo:Repository<Account>,

@InjectRepository(StaffDetail)
    private readonly staffRepo: Repository<StaffDetail>,

 ){}

 async create(dto:CreateAccountDto, createdBy: string) {
   
    const user = await this.repo.findOne({
      where: { email: dto.email, roles: UserRole.STAFF },
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
      roles: UserRole.STAFF,
    });
    const payload = await this.repo.save(obj);
    const object = Object.assign({
      email: dto.email,
      dob: dto.dob,
      accountId: payload.id,
    });
    await this.staffRepo.save(object);
    return payload;
  }

 
}
