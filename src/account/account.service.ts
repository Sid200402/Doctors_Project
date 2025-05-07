import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PaginationDto, UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Brackets, Repository } from 'typeorm';


@Injectable()
export class AccountService {
 constructor(
@InjectRepository(Account) private readonly repo:Repository<Account>,



 ){}

 async findAllAccounts(dto: PaginationDto) {
  const keyword = dto.keyword || '';

  const queryBuilder = this.repo.createQueryBuilder('account')
      .leftJoinAndSelect('account.doctorDetail', 'doctorDetail')
      .leftJoinAndSelect('account.userDetail', 'userDetail')
      .select([
          'account.id',
          'account.email',
          'account.roles',
          'account.status',
          'account.createdAt',
          'doctorDetail.id',
          '.name',
          'userDetail.id',
        'userDetail.name',
      ])
      .where(
          new Brackets(qb => {
              qb.where('account.email LIKE :keyword', { keyword: `%${keyword}%` })
                  .orWhere('doctorDetail.name LIKE :keyword', { keyword: `%${keyword}%` })
                  .orWhere('userDetail.name LIKE :keyword', { keyword: `%${keyword}%` })
                  
          })
      )
      .orderBy('account.createdAt', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

  const [result, total] = await queryBuilder.getManyAndCount();
  return { result, total };
}


  async getDoctorDetails(accountId: string) {
    const result = await this.repo.createQueryBuilder('account')
      .leftJoinAndSelect('account.doctorDetail', 'doctorDetail')
      .select([
        'account.id',
        'account.email',
        'account.roles',
        'account.status',
        'account.createdAt',
        'doctorDetail.id',
        'doctorDetail.name',
      ])
      .where('account.id = :accountId', { accountId })
      .getOne();
  
    if (!result) throw new NotFoundException('Doctor Profile Not Found!');
    return result;
  }
  
  async getUserDetails(accountId: string) {
    const result = await this.repo.createQueryBuilder('account')
      .leftJoinAndSelect('account.userDetail', 'userDetail')
      .select([
        'account.id',
        'account.email',
        'account.roles',
        'account.status',
        'account.createdAt',
        'userDetail.id',
        'userDetail.name',
      ])
      .where('account.id = :accountId', { accountId })
      .getOne();
  
    if (!result) throw new NotFoundException('User Profile Not Found!');
    return result;
  }
 
}
