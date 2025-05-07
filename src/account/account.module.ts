import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { DoctorDetail } from 'src/doctor-details/entities/doctor-detail.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Account,DoctorDetail,UserDetail])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
