import { PartialType } from '@nestjs/swagger';
import { CreateMedicineStockDto } from './create-medicine-stock.dto';

export class UpdateMedicineStockDto extends PartialType(CreateMedicineStockDto) {}
