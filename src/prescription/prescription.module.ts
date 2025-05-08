import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { Prescription } from './entities/prescription.entity';
import { PrescribedMedicine } from '../prescribed-medicine/entities/prescribed-medicine.entity';
import { EmailService } from '../utils/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription, PrescribedMedicine])],
  controllers: [PrescriptionController],
  providers: [PrescriptionService, EmailService],
  exports: [PrescriptionService, EmailService],
})
export class PrescriptionModule { }
