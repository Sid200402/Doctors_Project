import { Injectable } from '@nestjs/common';
import { CreatePatientDocumentDto } from './dto/create-patient-document.dto';
import { UpdatePatientDocumentDto } from './dto/update-patient-document.dto';

@Injectable()
export class PatientDocumentService {
  create(createPatientDocumentDto: CreatePatientDocumentDto) {
    return 'This action adds a new patientDocument';
  }

  findAll() {
    return `This action returns all patientDocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientDocument`;
  }

  update(id: number, updatePatientDocumentDto: UpdatePatientDocumentDto) {
    return `This action updates a #${id} patientDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientDocument`;
  }
}
