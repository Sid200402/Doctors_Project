import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { PaginationDto, UpdateAccountDto } from './dto/update-account.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/enum';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { Account } from './entities/account.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.gurad';
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

 
  }




