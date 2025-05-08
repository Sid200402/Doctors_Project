import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicineStockService } from './medicine-stock.service';
import { CreateMedicineStockDto } from './dto/create-medicine-stock.dto';
import { UpdateMedicineStockDto } from './dto/update-medicine-stock.dto';

@Controller('medicine-stock')
export class MedicineStockController {
  constructor(private readonly medicineStockService: MedicineStockService) {}

  @Post()
  create(@Body() createMedicineStockDto: CreateMedicineStockDto) {
    return this.medicineStockService.create(createMedicineStockDto);
  }

  @Get()
  findAll() {
    return this.medicineStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicineStockDto: UpdateMedicineStockDto) {
    return this.medicineStockService.update(+id, updateMedicineStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicineStockService.remove(+id);
  }
}
