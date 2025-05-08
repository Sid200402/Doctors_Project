import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrescriptionTemplate } from './entities/prescription-template.entity';
import { PrescriptionTemplateItem } from './entities/prescription-template-item.entity';
import { CreatePrescriptionTemplateDto } from './dto/create-prescription-template.dto';
import { UpdatePrescriptionTemplateDto } from './dto/update-prescription-template.dto';

@Injectable()
export class PrescriptionTemplateService {
 
}
