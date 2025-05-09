import { Injectable } from '@nestjs/common';
import { UpdatePrescribedMedicineDto } from './dto/update-prescribed-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrescribedMedicine } from './entities/prescribed-medicine.entity';
import { Medicine } from '../medicine/entities/medicine.entity';
import { Repository } from 'typeorm';
import { MedicineService } from '../medicine/medicine.service';
import { CreatePrescribedMedicineDto } from './dto/create-prescribed-medicine.dto';

@Injectable()
export class PrescribedMedicineService {
  constructor(
    @InjectRepository(PrescribedMedicine)
    private readonly prescribedMedicineRepository: Repository<PrescribedMedicine>,
    private readonly medicineService: MedicineService,
  ) {}

  async create(dto: CreatePrescribedMedicineDto): Promise<PrescribedMedicine> {
    const obj = Object.create(dto);
    const savedPrescribedMedicine = await this.prescribedMedicineRepository.save(obj);

    if (savedPrescribedMedicine.medicineId) {
      await this.medicineService.incrementUsageFrequency(savedPrescribedMedicine.medicineId);
    }

    return savedPrescribedMedicine;
  }

  findAll() {
    return `This action returns all prescribedMedicine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prescribedMedicine`;
  }

  update(id: number, updatePrescribedMedicineDto: UpdatePrescribedMedicineDto) {
    return `This action updates a #${id} prescribedMedicine`;
  }

  remove(id: number) {
    return `This action removes a #${id} prescribedMedicine`;
  }
}
