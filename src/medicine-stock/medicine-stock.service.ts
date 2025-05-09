import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, Between, Not, IsNull, In, LessThanOrEqual } from 'typeorm';
import { MedicineStock } from './entities/medicine-stock.entity';
import { Medicine } from '../medicine/entities/medicine.entity';

import { DecreaseStockDto, MedicineStockDto, UpdateBatchVendorInfoDto, UpdateStockDto } from './dto/create-medicine-stock.dto';

@Injectable()
export class MedicineStockService {
  constructor(
    @InjectRepository(MedicineStock)
    private stockRepository: Repository<MedicineStock>,
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
  ) {}

  async addStock(dto: MedicineStockDto){
    const existingStock = await this.stockRepository.findOne({
      where: {
        medicine: { id: dto.medicineId },
        batchNumber:dto.batchNumber,
        expiryDate: dto.expiryDate,
      },
    });

    if (existingStock) {
      existingStock.quantity += dto.quantity;
      return await this.stockRepository.save(existingStock);
    } else {
      const obj = Object.create(dto);
      return await this.stockRepository.save(obj);
    }
  }

  async checkExpiryAlerts() {
    const currentDate = new Date();
    const alertDate = new Date();
    alertDate.setDate(currentDate.getDate() + 30);
    return await this.stockRepository.find({
      where: {
        expiryDate: Between(currentDate, alertDate),
        isActive: true,
      },
    });
  }


  async updateOrAddStock(dto: UpdateStockDto){
    const existingStock = await this.stockRepository.findOne({
      where: {
        id: dto.stockId,
        batchNumber: dto.batchNumber,
        expiryDate: dto.expiryDate,
      },
    });

    if (existingStock) {
      existingStock.quantity = (existingStock.quantity || 0) + dto.quantity;
      if (dto.vendorName) existingStock.vendorName = dto.vendorName;
      if (dto.isActive !== undefined) existingStock.isActive = dto.isActive;
      return await this.stockRepository.save(existingStock);
    } else {
      const newStock = this.stockRepository.create(dto);
      return await this.stockRepository.save(newStock);
    }
  }


  async decreaseStockQuantity(dto:DecreaseStockDto) {
    const stock = await this.stockRepository.findOne({
      where: { id: dto.stockId },
    });

    if (!stock) {
      throw new NotFoundException('Stock not found');
    }

    if (stock.quantity < dto.quantity) {
      throw new BadRequestException('Insufficient stock');
    }
    stock.quantity -= dto.quantity;
    return await this.stockRepository.save(stock);
  }

async updateBatchVendorInfo(dto: UpdateBatchVendorInfoDto) {
  const stock = await this.stockRepository.findOne({
    where: { id: dto.stockId },
  });

  if (!stock) {
    throw new NotFoundException('Stock not found');
  }
  stock.batchNumber = dto.batchNumber;
  stock.vendorName = dto.vendorName;

  return await this.stockRepository.save(stock);
}


}
