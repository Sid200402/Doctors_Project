import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClinicDepartmentService } from './clinic-department.service';
import { CreateClinicDepartmentDto } from './dto/create-clinic-department.dto';
import { UpdateClinicDepartmentDto } from './dto/update-clinic-department.dto';

@Controller('clinic-department')
export class ClinicDepartmentController {
  constructor(private readonly clinicDepartmentService: ClinicDepartmentService) {}

  @Post()
  create(@Body() createClinicDepartmentDto: CreateClinicDepartmentDto) {
    return this.clinicDepartmentService.create(createClinicDepartmentDto);
  }

  @Get()
  findAll() {
    return this.clinicDepartmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicDepartmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicDepartmentDto: UpdateClinicDepartmentDto) {
    return this.clinicDepartmentService.update(+id, updateClinicDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicDepartmentService.remove(+id);
  }
}
