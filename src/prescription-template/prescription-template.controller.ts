import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionTemplateService } from './prescription-template.service';
import { CreatePrescriptionTemplateDto } from './dto/create-prescription-template.dto';
import { UpdatePrescriptionTemplateDto } from './dto/update-prescription-template.dto';

@Controller('prescription-template')
export class PrescriptionTemplateController {
  constructor(private readonly prescriptionTemplateService: PrescriptionTemplateService) { }


}
