import { Injectable, NotFoundException,  ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto, PaginationDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { MedicalHistory } from '../medical-history/entities/medical-history.entity';
import { Visit } from '../visit/entities/visit.entity';
import { Prescription } from '../prescription/entities/prescription.entity';
import { Case } from '../case/entities/case.entity';
import * as fs from 'fs';
import * as path from 'path';
import { generatePatientSummaryPdf, PatientSummaryData } from '../utils/patient-pdf-generator.util';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(MedicalHistory)
    private medicalHistoryRepository: Repository<MedicalHistory>,
    @InjectRepository(Visit)
    private visitRepository: Repository<Visit>,
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
    @InjectRepository(Case)
    private caseRepository: Repository<Case>,
  ) { }

  async create(dto: CreatePatientDto) {
    const patient = await this.patientRepository.findOne({
      where: { accountId: dto.accountId },
    });
    if (patient) {
      throw new ConflictException('Patient with this email already exists');
    }
    const obj = Object.assign(dto);
    return this.patientRepository.save(obj);
  }

  async findAll(dto: PaginationDto) {
    const query = this.patientRepository.createQueryBuilder('patient')
      .leftJoinAndSelect('patient.account', 'account')
      .leftJoinAndSelect('patient.medicalHistories', 'medicalHistories')
      .leftJoinAndSelect('patient.visits', 'visits')
      .leftJoinAndSelect('patient.prescriptions', 'prescriptions')
      .leftJoinAndSelect('patient.cases', 'cases')
      .orderBy('patient.createdAt', 'DESC')
      .take(dto.limit)
      .skip(dto.offset);

    if (dto.keyword) {
      query.andWhere(
        `(LOWER(patient.patientname) LIKE LOWER(:keyword) OR LOWER(patient.insuranceNumber) LIKE LOWER(:keyword))`,
        { keyword: `%${dto.keyword}%` }
      );
    }
    if (dto.patientname) {
      query.andWhere('LOWER(patient.patientname) LIKE LOWER(:name)', {
        name: `%${dto.patientname}%`,
      });
    }

    if (dto.email) {
      query.andWhere('LOWER(account.email) LIKE LOWER(:email)', {
        email: `%${dto.email}%`,
      });
    }

    if (dto.phone) {
      query.andWhere('account.phoneNumber LIKE :phone', {
        phone: `%${dto.phone}%`,
      });
    }

    if (dto.gender) {
      query.andWhere('patient.gender = :gender', { gender: `%${dto.gender}%` });
    }

    if (dto.insuranceNumber) {
      query.andWhere('patient.insuranceNumber LIKE :insuranceNumber', {
        insuranceNumber: `%${dto.insuranceNumber}%`,
      });
    }

    if (dto.condition) {
      query.andWhere('patient.chronicConditions LIKE :condition', {
        condition: `%${dto.condition}%`,
      });
    }

    const [result, total] = await query.getManyAndCount();

    return { result, total };
  }

  async findOne(id: string) {
    const patient = await this.patientRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.account', 'account')
      .where('patient.accountId = :id', { id })
      .select([
        'patient',
        'account.id',
        'account.email',
        'account.phoneNumber',
        'account.roles',
        'account.status',
      ])
      .getOne();

    if (!patient) {
      throw new NotFoundException(`Patient with account ID ${id} not found`);
    }

    return patient;
  }

  async getPatientProfile(accountId: string) {
    const patient = await this.patientRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.account', 'account')
      .leftJoinAndSelect('patient.medicalHistories', 'medicalHistories')
      .leftJoinAndSelect('medicalHistories.documents', 'documents')
      .leftJoinAndSelect('patient.visits', 'visits')
      .leftJoinAndSelect('visits.doctor', 'visitDoctor')
      .leftJoinAndSelect('patient.prescriptions', 'prescriptions')
      .leftJoinAndSelect('prescriptions.doctor', 'prescriptionDoctor')
      .leftJoinAndSelect('prescriptions.prescribedMedicines', 'prescribedMedicines')
      .leftJoinAndSelect('prescribedMedicines.medicine', 'medicine')
      .leftJoinAndSelect('patient.cases', 'cases')
      .leftJoinAndSelect('cases.doctor', 'caseDoctor')
      .select([
        'patient',
        'account.id',
        'account.email',
        'account.phoneNumber',
        'medicalHistories.id',
        'medicalHistories.diagnosis',
        'medicalHistories.diagnosisDate',
        'documents.id',
        'documents.fileUrl',
        'visits.id',
        'visits.visitDateTime',
        'visitDoctor.id',
        'visitDoctor.name',
        'prescriptions.id',
        'prescriptions.prescriptionDate',
        'prescriptionDoctor.id',
        'prescriptionDoctor.name',
        'prescribedMedicines.id',
        'medicine.id',
        'medicine.name',
        'cases.id',
        'cases.status',
        'caseDoctor.id',
        'caseDoctor.name',
      ])
      .where('account.id = :accountId', { accountId })
      .getOne();

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${accountId} not found`);
    }

    return patient;

  }

  async getPatientVisitTimeline(id: string): Promise<Visit[]> {
    return this.visitRepository
      .createQueryBuilder('visit')
      .leftJoinAndSelect('visit.doctor', 'doctor')
      .leftJoinAndSelect('visit.prescriptions', 'prescriptions')
      .leftJoinAndSelect('prescriptions.prescribedMedicines', 'prescribedMedicines')
      .leftJoinAndSelect('prescribedMedicines.medicine', 'medicine')
      .where('visit.patientId = :id', { id })
      .orderBy('visit.visitDateTime', 'DESC')
      .getMany();
  }
  async getPatientMedicalHistory(id: string): Promise<MedicalHistory[]> {
    return this.medicalHistoryRepository
      .createQueryBuilder('medicalHistory')
      .leftJoinAndSelect('medicalHistory.documents', 'documents')
      .where('medicalHistory.patientId = :id', { id })
      .orderBy('medicalHistory.diagnosisDate', 'DESC')
      .getMany();
  }
  async getPatientPrescriptions(id: string): Promise<Prescription[]> {
    return this.prescriptionRepository
      .createQueryBuilder('prescription')
      .leftJoinAndSelect('prescription.doctor', 'doctor')
      .leftJoinAndSelect('prescription.prescribedMedicines', 'prescribedMedicines')
      .leftJoinAndSelect('prescribedMedicines.medicine', 'medicine')
      .leftJoinAndSelect('prescription.visit', 'visit')
      .where('prescription.patientId = :id', { id })
      .orderBy('prescription.prescriptionDate', 'DESC')
      .getMany();
  }

  async getPatientCases(id: string): Promise<Case[]> {
    return this.caseRepository
      .createQueryBuilder('case')
      .leftJoinAndSelect('case.doctor', 'doctor')
      .where('case.patientId = :id', { id })
      .orderBy('case.createdAt', 'DESC')
      .getMany();
  }
  async update(accountId: string, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientRepository.findOne({where: { accountId }});
    if (!patient) {
      throw new NotFoundException(`Patient with account ID ${accountId} not found`);
    }

    Object.assign(patient, updatePatientDto);

    return this.patientRepository.save(patient);
  }

  async profileImage(image: string, result: Patient) {
    const obj = Object.assign(result, {
      profile: process.env.CDN_LINK + image,
      profileName: image,
    });
    return this.patientRepository.save(obj);
  }

  async aadharImage(image: string, result: Patient) {
    const obj = Object.assign(result, {
      aadhar: process.env.CDN_LINK + image,
      aadharPath: image,
    });
    return this.patientRepository.save(obj);
  }

  async insuranceImage(image: string, result: Patient) {
    const obj = Object.assign(result, {
      insurance: process.env.CDN_LINK + image,
      insurancePath: image,
    });
    return this.patientRepository.save(obj);
  }

  async remove(id: string) {
    const result = await this.patientRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }


  async generatePatientSummarypdf(id: string): Promise<{ filePath: string }> {
    const profileData = await this.getPatientProfile(id);
    const uploadsDir = path.join(process.cwd(), 'uploads', 'patient', 'summaries');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileName = `patient_summary_${id}_${Date.now()}.pdf`;
    const filePath = path.join(uploadsDir, fileName);


    const pdfData: PatientSummaryData = {
      patient: profileData,
      medicalHistories: profileData.medicalHistories,
      recentVisits: profileData.visits,
      recentPrescriptions: profileData.prescriptions,
      allergies: profileData.allergies,
      chronicConditions: profileData.chronicConditions,
    };

    await generatePatientSummaryPdf(pdfData, filePath);

    return { filePath: `/uploads/patient/summaries/${fileName}` };
  }
}
