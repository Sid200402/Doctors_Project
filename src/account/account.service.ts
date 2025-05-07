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


 
}
