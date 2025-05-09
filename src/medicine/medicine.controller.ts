import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto, PaginationDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}
  @Post()
  async create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.create(createMedicineDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.medicineService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.medicineService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicineService.update(id, updateMedicineDto);
  }
}
