import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile, Query } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto, PaginationDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';


@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  findAll(@Query() dto: PaginationDto) {
    return this.prescriptionService.findAll(dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string,@Query() dto: PaginationDto) {
    return this.prescriptionService.findByPatient(patientId, dto);
  }

  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string,@Query() dto: PaginationDto) {
    return this.prescriptionService.findByDoctor(doctorId, dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionService.update(id, updatePrescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(id);
  }

  @Post(':id/clone')
  clonePrescription(
    @Param('id') id: string,
    @Body('visitId') visitId: string,
  ) {
    return this.prescriptionService.clonePrescription(id, visitId);
  }

  @Get(':id/pdf')
  async generatePDF(@Param('id') id: string) {
    return this.prescriptionService.generatePDF(id);
  }

  @Get(':id/download-pdf')
  async downloadPDF(@Param('id') id: string, @Res() res: Response) {
    const { filePath } = await this.prescriptionService.generatePDF(id);

    const absolutePath = path.join(process.cwd(), filePath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="prescription.pdf"`);

    const fileStream = fs.createReadStream(absolutePath);
    fileStream.pipe(res);
  }

  @Get(':id/view-pdf')
  async viewPDF(@Param('id') id: string, @Res() res: Response) {
    const { filePath } = await this.prescriptionService.generatePDF(id);


    const absolutePath = path.join(process.cwd(), filePath);


    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');


    const fileStream = fs.createReadStream(absolutePath);
    fileStream.pipe(res);
  }


}
