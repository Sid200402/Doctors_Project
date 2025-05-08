import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';

import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


import { CacheModule } from '@nestjs/cache-manager';
import { PatientModule } from './patient/patient.module';
import { ClinicModule } from './clinic/clinic.module';
import { ClinicDepartmentModule } from './clinic-department/clinic-department.module';
import { DoctorModule } from './doctor/doctor.module';
import { StaffDetailsModule } from './staff-details/staff-details.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UserPermissionsModule } from './user-permissions/user-permissions.module';
import { MenusModule } from './menus/menus.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:false
    }),
    CacheModule.register({

      isGlobal:true,
    }),

    AccountModule,
   
    AuthModule,
   
    PatientModule,
   
    ClinicModule,
   
    ClinicDepartmentModule,
   
    DoctorModule,
   
    StaffDetailsModule,
   
    PermissionsModule,
   
    UserPermissionsModule,
   
    MenusModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
