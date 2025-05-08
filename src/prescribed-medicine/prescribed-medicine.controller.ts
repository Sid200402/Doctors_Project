import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescribedMedicineService } from './prescribed-medicine.service';
import { CreatePrescribedMedicineDto } from './dto/create-prescribed-medicine.dto';
import { UpdatePrescribedMedicineDto } from './dto/update-prescribed-medicine.dto';

@Controller('prescribed-medicine')
export class PrescribedMedicineController {
  constructor(private readonly prescribedMedicineService: PrescribedMedicineService) {}

  @Post()
  create(@Body() createPrescribedMedicineDto: CreatePrescribedMedicineDto) {
    return this.prescribedMedicineService.create(createPrescribedMedicineDto);
  }

  @Get()
  findAll() {
    return this.prescribedMedicineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescribedMedicineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescribedMedicineDto: UpdatePrescribedMedicineDto) {
    return this.prescribedMedicineService.update(+id, updatePrescribedMedicineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescribedMedicineService.remove(+id);
  }
}
