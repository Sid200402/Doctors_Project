import { Module } from '@nestjs/common';
import { PrescribedMedicineService } from './prescribed-medicine.service';
import { PrescribedMedicineController } from './prescribed-medicine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescribedMedicine } from './entities/prescribed-medicine.entity';
import { MedicineModule } from '../medicine/medicine.module';

@Module({
  imports: [TypeOrmModule.forFeature([PrescribedMedicine]),
    MedicineModule],
  controllers: [PrescribedMedicineController],
  providers: [PrescribedMedicineService],
})
export class PrescribedMedicineModule { }
