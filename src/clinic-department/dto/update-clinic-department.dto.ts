import { PartialType } from '@nestjs/swagger';
import { CreateClinicDepartmentDto } from './create-clinic-department.dto';

export class UpdateClinicDepartmentDto extends PartialType(CreateClinicDepartmentDto) {}
