import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { Medicine } from './entities/medicine.entity';
import { MedicineStock } from '../medicine-stock/entities/medicine-stock.entity';
import { PrescribedMedicine } from '../prescribed-medicine/entities/prescribed-medicine.entity';
import { MedicineCategory } from '../medicine-category/entities/medicine-category.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Medicine, MedicineStock, PrescribedMedicine, MedicineCategory]),
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
  exports: [MedicineService],
})
export class MedicineModule { }
