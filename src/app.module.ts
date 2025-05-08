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
import { MedicineModule } from './medicine/medicine.module';
import { MedicineStockModule } from './medicine-stock/medicine-stock.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { ReportsModule } from './reports/reports.module';
import { VisitModule } from './visit/visit.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { PrescribedMedicineModule } from './prescribed-medicine/prescribed-medicine.module';
import { CaseModule } from './case/case.module';
import { PrescriptionTemplateModule } from './prescription-template/prescription-template.module';
import { AppointmentModule } from './appointment/appointment.module';

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
      synchronize:true,
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
    MedicineModule,
    MedicineStockModule,
    MedicalHistoryModule,
    ReportsModule,
    VisitModule,
    PrescriptionModule,
    PrescribedMedicineModule,
    CaseModule,
    PrescriptionTemplateModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
