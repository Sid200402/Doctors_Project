import { Injectable } from '@nestjs/common';
import { UpdatePrescribedMedicineDto } from './dto/update-prescribed-medicine.dto';

@Injectable()
export class PrescribedMedicineService {
  create() {
    return 'This action adds a new prescribedMedicine';
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
