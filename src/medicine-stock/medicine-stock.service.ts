import { Injectable } from '@nestjs/common';
import { CreateMedicineStockDto } from './dto/create-medicine-stock.dto';
import { UpdateMedicineStockDto } from './dto/update-medicine-stock.dto';

@Injectable()
export class MedicineStockService {
  create(createMedicineStockDto: CreateMedicineStockDto) {
    return 'This action adds a new medicineStock';
  }

  findAll() {
    return `This action returns all medicineStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicineStock`;
  }

  update(id: number, updateMedicineStockDto: UpdateMedicineStockDto) {
    return `This action updates a #${id} medicineStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicineStock`;
  }
}
