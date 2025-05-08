import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { EmailPrescriptionDto } from './dto/email-prescription.dto';

@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.prescriptionService.findByPatient(patientId);
  }

  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.prescriptionService.findByDoctor(doctorId);
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
    
    // Get the absolute path
    const absolutePath = path.join(process.cwd(), filePath);
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="prescription.pdf"`);
    
    // Stream the file to the response
    const fileStream = fs.createReadStream(absolutePath);
    fileStream.pipe(res);
  }

  @Get(':id/view-pdf')
  async viewPDF(@Param('id') id: string, @Res() res: Response) {
    const { filePath } = await this.prescriptionService.generatePDF(id);
    
    // Get the absolute path
    const absolutePath = path.join(process.cwd(), filePath);
    
    // Set headers for inline viewing
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    
    // Stream the file to the response
    const fileStream = fs.createReadStream(absolutePath);
    fileStream.pipe(res);
  }

  @Post('email')
  async emailPrescription(@Body() emailDto: EmailPrescriptionDto) {
    return this.prescriptionService.emailPrescription(emailDto);
  }
}