import { Module } from '@nestjs/common';
import { ClinicDepartmentService } from './clinic-department.service';
import { ClinicDepartmentController } from './clinic-department.controller';

@Module({
  controllers: [ClinicDepartmentController],
  providers: [ClinicDepartmentService],
})
export class ClinicDepartmentModule {}
