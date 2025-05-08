import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { PrescribedMedicine } from '../prescribed-medicine/entities/prescribed-medicine.entity';
import { CreatePrescriptionDto, EmailPrescriptionDto, PaginationDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import * as path from 'path';
import { generatePrescriptionPdf, PrescriptionPdfData } from '../utils/pdf-generator.util';
import { EmailService } from '../utils/email.service';
import * as fs from 'fs';




@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
    @InjectRepository(PrescribedMedicine)
    private prescribedMedicineRepository: Repository<PrescribedMedicine>,
    private emailService: EmailService,
  ) { }

  async create(dto: CreatePrescriptionDto) {
    const { prescribedMedicines, ...prescriptionData } = dto;

    const obj = Object.create(prescriptionData);
    const savedPrescription = await this.prescriptionRepository.save(obj);

    if (prescribedMedicines && prescribedMedicines.length > 0) {
      const medicines = prescribedMedicines.map(medicine => {
        return this.prescribedMedicineRepository.create({
          ...medicine,
          prescriptionId: savedPrescription.id,
        });
      });

      await this.prescribedMedicineRepository.save(medicines);
    }

    return this.findOne(savedPrescription.id);
  }





  async findAll(dto: PaginationDto) {

    const queryBuilder = this.prescriptionRepository.createQueryBuilder('prescription')
      .select([
        'prescription.id',
        'prescription.prescriptionDate',
        'prescription.notes',
        'doctor.id',
        'doctor.name',
        'doctor.specialization',
        'patient.id',
        'patient.fullName',
        'patient.age',
        'patient.gender',
        'visit.id',
        'visit.reason',
        'prescribedMedicines.id',
        'prescribedMedicines.medicineId',
        'prescribedMedicines.dosage',
        'prescribedMedicines.frequency',
        'prescribedMedicines.duration',
        'prescribedMedicines.route',
        'prescribedMedicines.instructions'
      ])
      .leftJoin('prescription.prescribedMedicines', 'prescribedMedicines')
      .leftJoin('prescription.doctor', 'doctor')
      .leftJoin('prescription.patient', 'patient')
      .leftJoin('prescription.visit', 'visit')
      .orderBy('prescription.prescriptionDate', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    if (dto.keyword) {
      queryBuilder.andWhere(
        '(LOWER(doctor.name) LIKE :keyword OR LOWER(patient.fullName) LIKE :keyword)',
        { keyword: `%${dto.keyword.toLowerCase()}%` },
      );
    }

    const [result, total] = await queryBuilder.getManyAndCount();
    return { result, total };
  }

  async findByPatient(patientId: string, dto: PaginationDto) {

    const queryBuilder = this.prescriptionRepository.createQueryBuilder('prescription')
      .select([
        'prescription.id',
        'prescription.prescriptionDate',
        'prescription.notes',
        'doctor.id',
        'doctor.name',
        'doctor.specialization',
        'patient.id',
        'patient.fullName',
        'patient.age',
        'patient.gender',
        'visit.id',
        'visit.reason',
        'prescribedMedicines.id',
        'prescribedMedicines.medicineId',
        'prescribedMedicines.dosage',
        'prescribedMedicines.frequency',
        'prescribedMedicines.duration',
        'prescribedMedicines.route',
        'prescribedMedicines.instructions'
      ])
      .where('prescription.patientId = :patientId', { patientId })
      .leftJoin('prescription.prescribedMedicines', 'prescribedMedicines')
      .leftJoin('prescription.doctor', 'doctor')
      .leftJoin('prescription.patient', 'patient')
      .leftJoin('prescription.visit', 'visit')
      .orderBy('prescription.prescriptionDate', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    const [result, total] = await queryBuilder.getManyAndCount();
    return { result, total };
  }

  async findByDoctor(doctorId: string, dto: PaginationDto) {

    const queryBuilder = this.prescriptionRepository.createQueryBuilder('prescription')
      .select([
        'prescription.id',
        'prescription.prescriptionDate',
        'prescription.notes',
        'doctor.id',
        'doctor.name',
        'doctor.specialization',
        'patient.id',
        'patient.fullName',
        'patient.age',
        'patient.gender',
        'visit.id',
        'visit.reason',
        'prescribedMedicines.id',
        'prescribedMedicines.medicineId',
        'prescribedMedicines.dosage',
        'prescribedMedicines.frequency',
        'prescribedMedicines.duration',
        'prescribedMedicines.route',
        'prescribedMedicines.instructions'
      ])
      .where('prescription.doctorId = :doctorId', { doctorId })
      .leftJoin('prescription.prescribedMedicines', 'prescribedMedicines')
      .leftJoin('prescription.doctor', 'doctor')
      .leftJoin('prescription.patient', 'patient')
      .leftJoin('prescription.visit', 'visit')
      .orderBy('prescription.prescriptionDate', 'DESC')
      .skip(dto.offset)
      .take(dto.limit);

    const [result, total] = await queryBuilder.getManyAndCount();
    return { result, total };
  }

  async findOne(id: string) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
      relations: ['prescribedMedicines', 'prescribedMedicines.medicine', 'doctor', 'patient', 'visit'],
    });

    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }

    return prescription;
  }

  async update(id: string, dto: UpdatePrescriptionDto) {
    const prescription = await this.findOne(id);

    const { prescribedMedicines, ...data } = dto;
    const obj = Object.assign(prescription, data);
    await this.prescriptionRepository.save(obj);

    if (prescribedMedicines) {
      await this.prescribedMedicineRepository.delete({ prescriptionId: id });

      const medicines = prescribedMedicines.map(medicine =>
        this.prescribedMedicineRepository.create({
          ...medicine,
          prescriptionId: id,
        })
      );

      await this.prescribedMedicineRepository.save(medicines);
    }


    return this.findOne(id);
  }


  async remove(id: string) {
    const result = await this.prescriptionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
  }

  async clonePrescription(id: string, visitId: string) {
    const originalPrescription = await this.findOne(id);

    const newPrescription = this.prescriptionRepository.create({
      patientId: originalPrescription.patientId,
      doctorId: originalPrescription.doctorId,
      visitId: visitId,
      notes: originalPrescription.notes,
    });

    const savedPrescription = await this.prescriptionRepository.save(newPrescription);

    if (originalPrescription.prescribedMedicines && originalPrescription.prescribedMedicines.length > 0) {
      const medicines = originalPrescription.prescribedMedicines.map(medicine => {
        return this.prescribedMedicineRepository.create({
          medicineId: medicine.medicineId,
          dosage: medicine.dosage,
          frequency: medicine.frequency,
          duration: medicine.duration,
          route: medicine.route,
          instructions: medicine.instructions,
          prescriptionId: savedPrescription.id,
        });
      });

      await this.prescribedMedicineRepository.save(medicines);
    }

    return this.findOne(savedPrescription.id);
  }



  async generatePDF(id: string) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient', 'prescribedMedicines'],
    });

    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }

    if (!prescription.patient || !prescription.doctor) {
      throw new NotFoundException('Patient or doctor information not found for this prescription');
    }

    const pdfData: PrescriptionPdfData = {
      patientName: prescription.patient.patientname || 'Unknown Patient',
      serialNumber: prescription.id.substring(0, 8),
      dob: prescription.patient.dateOfBirth ? prescription.patient.dateOfBirth.toLocaleDateString() : 'N/A',
      age: prescription.patient.age?.toString() || 'N/A',
      date: prescription.prescriptionDate.toLocaleDateString(),
      gender: prescription.patient.gender || 'N/A',
      doctorName: prescription.doctor.name || 'Unknown Doctor',
      doctorSpecialization: prescription.doctor.specialization || 'Specialist',
      doctorId: prescription.doctor.id.substring(0, 8),
      clinicName: 'Medical Care Clinic',
      clinicPhone: '+91 2345 6789',
      clinicEmail: 'clinicname@gmail.com',
      clinicWebsite: 'www.yourwebsite.com',
      clinicAddress: 'sfrghnjmkmjkjhkjhkjhkjhkjhkjhkjhkjhkjhkjh',
      medicines: prescription.prescribedMedicines.map(med => ({
        disease: med.disease || 'N/A',
        medicine: med.medicine?.name || 'Unknown Medicine',
        dosage: med.dosage || 'N/A',
        frequency: med.frequency || 'N/A',
        duration: med.duration || 'N/A',
        note: med.instructions || 'N/A',
      })),
    };

    const uploadsDir = path.join(process.cwd(), 'uploads', 'prescriptions');
    const fileName = `prescription_${prescription.id}_${Date.now()}.pdf`;
    const filePath = path.join(uploadsDir, fileName);

    // Ensure the directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    await generatePrescriptionPdf(pdfData, filePath);

    return { filePath: `/uploads/prescriptions/${fileName}` };
  }


  // async emailPrescription(emailDto: EmailPrescriptionDto) {
  //   try {
  //     const { filePath } = await this.generatePDF(emailDto.prescriptionId);

  //     const result = await this.emailService.sendPrescriptionEmail(
  //       emailDto.email,
  //       emailDto.subject,
  //       emailDto.message,
  //       filePath,
  //     );

  //     if (result) {
  //       return {
  //         success: true,
  //         message: `Prescription successfully sent to ${emailDto.email}`,
  //       };
  //     } else {
  //       return {
  //         success: false,
  //         message: 'Failed to send email. Please check your email configuration.',
  //       };
  //     }
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: `Error sending email: ${error.message}`,
  //     };
  //   }
  // }
}
