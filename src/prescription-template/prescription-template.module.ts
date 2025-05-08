import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionTemplateService } from './prescription-template.service';
import { PrescriptionTemplateController } from './prescription-template.controller';
import { PrescriptionTemplate } from './entities/prescription-template.entity';
import { PrescriptionTemplateItem } from './entities/prescription-template-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionTemplate, PrescriptionTemplateItem])],
  controllers: [PrescriptionTemplateController],
  providers: [PrescriptionTemplateService],
  exports: [PrescriptionTemplateService],
})
export class PrescriptionTemplateModule {}