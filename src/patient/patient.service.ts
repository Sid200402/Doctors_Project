import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { DefaultStatus } from '../enum';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private readonly patientRepo: Repository<Patient>,) { }


  create(createPatientDto: CreatePatientDto) {
    return 'This action adds a new patient';
  }

  async getProfile(accountId: string) {
    const result = await this.patientRepo
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.medicalHistories', 'medicalHistories')
      .select([
        'patient.id',
        'patient.accountId',
        'patient.fullName',
        'patient.age',
        'patient.gender',
        'patient.aadhar',
        'patient.aadharName',
        'patient.insurance',
        'patient.insuranceName',
        'patient.createdAt',
        'patient.updatedAt',

        // 'account.id',
        // 'account.phoneNumber',
        // 'account.roles',
        // 'account.status',
        // 'account.createdAt',

        'medicalHistories.id',
        'medicalHistories.type',
        'medicalHistories.desc',
        'medicalHistories.occurredOn',
      ])
      .where('patient.accountId = :accountId', { accountId })
      .getOne();

    if (!result) {
      throw new NotFoundException('Patient not found!');
    }

    return result;
  }

  async findOne(id: string) {
    const result = await this.patientRepo.findOne({
      where: { accountId: id },
    });
    if (!result) {
      throw new NotFoundException('User not found!');
    }
    return result;
  }

  async update(dto: UpdatePatientDto, accountId: string) {
    const patient = await this.patientRepo.findOne({ where: { accountId } });

    if (!patient) {
      throw new NotFoundException('Patient profile not found!');
    }

    const updated = Object.assign(patient, dto);
    return await this.patientRepo.save(updated);
  }

  async profileImage(image: string, patient: Patient) {
    const updated = Object.assign(patient, {
      profile: process.env.CDN_LINK + image,
      profileName: image,
    });
    return await this.patientRepo.save(updated);
  }
  async aadharImg(image: string, patient: Patient) {
    const updated = Object.assign(patient, {
      profile: process.env.CDN_LINK + image,
      profileName: image,
    });
    return await this.patientRepo.save(updated);
  }
  async insuranceImg(image: string, patient: Patient) {
    const updated = Object.assign(patient, {
      profile: process.env.CDN_LINK + image,
      profileName: image,
    });
    return await this.patientRepo.save(updated);
  }

  // async remove(accountId: string) {
  //   const patient = await this.patientRepo.findOne({ where: { accountId } });

  //   if (!patient) {
  //     throw new NotFoundException('Patient not found!');
  //   }

  //   patient.status = DefaultStatus.DELETED;
  //   return await this.patientRepo.save(patient);
  // }

}
