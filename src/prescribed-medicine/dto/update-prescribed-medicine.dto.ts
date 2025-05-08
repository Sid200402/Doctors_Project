import { PartialType } from '@nestjs/swagger';
import { CreatePrescribedMedicineDto } from './create-prescribed-medicine.dto';

export class UpdatePrescribedMedicineDto extends PartialType(CreatePrescribedMedicineDto) {}
