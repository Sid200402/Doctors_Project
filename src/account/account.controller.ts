import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { PaginationDto, UpdateAccountDto } from './dto/update-account.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { PermissionAction, UserRole } from 'src/enum';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { Account } from './entities/account.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CheckPermissions } from 'src/auth/decorator/permissions.decorator';
import { PermissionsService } from 'src/permissions/permissions.service';
import { MenusService } from 'src/menus/menus.service';
import { UserPermissionsService } from 'src/user-permissions/user-permissions.service';
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService,
     private readonly menuService: MenusService,
    private readonly permissionService: PermissionsService,
    private readonly userPermService: UserPermissionsService,


  )
   {}
  @Post('add-staff')
  @UseGuards(AuthGuard('jwt'), RolesGuard, )
  @Roles(UserRole.ADMIN)
  @CheckPermissions([PermissionAction.CREATE, 'account'])
  async create(@Body() dto: CreateAccountDto, @CurrentUser() user: Account) {
    const account = await this.accountService.create(dto, user.id);
    const menus = await this.menuService.findAll();
    const perms = await this.permissionService.findAll();
    const obj = [];
    menus.forEach((menu) => {
      perms.forEach((perm) => {
        obj.push({
          accountId: account.id,
          menuId: menu.id,
          permissionId: perm.id,
        });
      });
    });
    await this.userPermService.create(obj);
    return account;
  }



 
  }




