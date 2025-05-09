import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineStockService } from './medicine-stock.service';
import { MedicineStockController } from './medicine-stock.controller';
import { MedicineStock } from './entities/medicine-stock.entity';
import { Medicine } from '../medicine/entities/medicine.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([MedicineStock, Medicine]),

  ],
  controllers: [MedicineStockController],
  providers: [MedicineStockService],
  exports: [MedicineStockService],
})
export class MedicineStockModule {}
