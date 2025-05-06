import { Module } from '@nestjs/common';
import { PatientDocumentService } from './patient-document.service';
import { PatientDocumentController } from './patient-document.controller';

@Module({
  controllers: [PatientDocumentController],
  providers: [PatientDocumentService],
})
export class PatientDocumentModule {}
