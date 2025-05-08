import { Injectable } from '@nestjs/common';
import { CreateClinicDepartmentDto } from './dto/create-clinic-department.dto';
import { UpdateClinicDepartmentDto } from './dto/update-clinic-department.dto';

@Injectable()
export class ClinicDepartmentService {
  create(createClinicDepartmentDto: CreateClinicDepartmentDto) {
    return 'This action adds a new clinicDepartment';
  }

  findAll() {
    return `This action returns all clinicDepartment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicDepartment`;
  }

  update(id: number, updateClinicDepartmentDto: UpdateClinicDepartmentDto) {
    return `This action updates a #${id} clinicDepartment`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicDepartment`;
  }
}
