import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescribedMedicineService } from './prescribed-medicine.service';
import { UpdatePrescribedMedicineDto } from './dto/update-prescribed-medicine.dto';
import { CreatePrescribedMedicineDto } from './dto/create-prescribed-medicine.dto';

@Controller('prescribed-medicine')
export class PrescribedMedicineController {
  constructor(private readonly prescribedMedicineService: PrescribedMedicineService) { }

  @Post()
  async create(@Body() dto: CreatePrescribedMedicineDto) {
    return this.prescribedMedicineService.create(dto);
  }

}
