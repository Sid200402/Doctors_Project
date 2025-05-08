import { Module } from '@nestjs/common';
import { MedicineStockService } from './medicine-stock.service';
import { MedicineStockController } from './medicine-stock.controller';

@Module({
  controllers: [MedicineStockController],
  providers: [MedicineStockService],
})
export class MedicineStockModule {}
