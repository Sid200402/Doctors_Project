import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { PatientModule } from './patient/patient.module';
import { ClinicDepartmentModule } from './clinic-department/clinic-department.module';
import { DoctorModule } from './doctor/doctor.module';
import { StaffDetailsModule } from './staff-details/staff-details.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UserPermissionsModule } from './user-permissions/user-permissions.module';
import { MenusModule } from './menus/menus.module';
import { MedicineModule } from './medicine/medicine.module';
import { MedicineStockModule } from './medicine-stock/medicine-stock.module';
import { MedicineCategoryModule } from './medicine-category/medicine-category.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { ReportsModule } from './reports/reports.module';
import { VisitModule } from './visit/visit.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { PrescribedMedicineModule } from './prescribed-medicine/prescribed-medicine.module';
import { CaseModule } from './case/case.module';
import { PrescriptionTemplateModule } from './prescription-template/prescription-template.module';
import { SettingModule } from './setting/setting.module';



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
      synchronize: false,

    }),
    CacheModule.register({
      isGlobal: true,
    }),
    AccountModule,
    AuthModule,
    PatientModule,
    ClinicDepartmentModule,
    DoctorModule,
    StaffDetailsModule,
    PermissionsModule,
    UserPermissionsModule,
    MenusModule,
    MedicineModule,
    MedicineStockModule,
    MedicineCategoryModule,
    MedicalHistoryModule,
    ReportsModule,
    VisitModule,
    PrescriptionModule,
    PrescribedMedicineModule,
    CaseModule,
    PrescriptionTemplateModule,
    SettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
