import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from './entities/patient.entity';
import { MedicalHistory } from '../medical-history/entities/medical-history.entity';
import { Visit } from '../visit/entities/visit.entity';
import { Prescription } from '../prescription/entities/prescription.entity';
import { Case } from '../case/entities/case.entity';
import { Report } from '../reports/entities/report.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, MedicalHistory, Visit, Prescription, Case, Report]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          let uploadPath = './uploads/patient/documents';
          
          // Create directory if it doesn't exist
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}