import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistory } from './entities/medical-history.entity';
import { Repository } from 'typeorm';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { Patient } from '../patient/entities/patient.entity';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private medicalHistoryRepo: Repository<MedicalHistory>,

    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) { }

  async create(dto: CreateMedicalHistoryDto) {
    const patient = await this.patientRepo.findOne({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException('Patient not found');
    const obj = Object.create(dto)
    return this.medicalHistoryRepo.save(dto);
  }

  async findOne(id: string) {
    const result = await this.medicalHistoryRepo.findOne({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException('User not found!');
    }
    return result;
  }

  async file(doc: string, medHis: MedicalHistory) {
    const updated = Object.assign(medHis, {
      file: process.env.CDN_LINK + doc,
      fileName: doc,
    });
    return await this.medicalHistoryRepo.save(updated);
  }
}
