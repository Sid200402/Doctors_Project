import { Module } from '@nestjs/common';
import { PrescribedMedicineService } from './prescribed-medicine.service';
import { PrescribedMedicineController } from './prescribed-medicine.controller';

@Module({
  controllers: [PrescribedMedicineController],
  providers: [PrescribedMedicineService],
})
export class PrescribedMedicineModule {}
