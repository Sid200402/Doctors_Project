import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientDocumentService } from './patient-document.service';
import { CreatePatientDocumentDto } from './dto/create-patient-document.dto';
import { UpdatePatientDocumentDto } from './dto/update-patient-document.dto';

@Controller('patient-document')
export class PatientDocumentController {
  constructor(private readonly patientDocumentService: PatientDocumentService) {}

  @Post()
  create(@Body() createPatientDocumentDto: CreatePatientDocumentDto) {
    return this.patientDocumentService.create(createPatientDocumentDto);
  }

  @Get()
  findAll() {
    return this.patientDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDocumentDto: UpdatePatientDocumentDto) {
    return this.patientDocumentService.update(+id, updatePatientDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientDocumentService.remove(+id);
  }
}
