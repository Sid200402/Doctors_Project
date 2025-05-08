import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionTemplateService } from './prescription-template.service';
import { CreatePrescriptionTemplateDto } from './dto/create-prescription-template.dto';
import { UpdatePrescriptionTemplateDto } from './dto/update-prescription-template.dto';

@Controller('prescription-template')
export class PrescriptionTemplateController {
  constructor(private readonly prescriptionTemplateService: PrescriptionTemplateService) {}

  @Post()
  create(@Body() createTemplateDto: CreatePrescriptionTemplateDto) {
    return this.prescriptionTemplateService.create(createTemplateDto);
  }

  @Get()
  findAll() {
    return this.prescriptionTemplateService.findAll();
  }

  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.prescriptionTemplateService.findByDoctor(doctorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionTemplateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemplateDto: UpdatePrescriptionTemplateDto) {
    return this.prescriptionTemplateService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionTemplateService.remove(id);
  }
}