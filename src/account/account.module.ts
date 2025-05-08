import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { StaffDetail } from 'src/staff-details/entities/staff-detail.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MenusModule } from 'src/menus/menus.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { UserPermissionsModule } from 'src/user-permissions/user-permissions.module';


@Module({
  imports:[TypeOrmModule.forFeature([Account,StaffDetail]),
  AuthModule,
  MenusModule,
  PermissionsModule,
  UserPermissionsModule,
],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService,AccountModule],
})
export class AccountModule {}
