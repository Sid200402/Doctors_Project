import { Injectable } from '@nestjs/common';
import { CreateStaffDetailDto } from './dto/create-staff-detail.dto';
import { UpdateStaffDetailDto } from './dto/update-staff-detail.dto';

@Injectable()
export class StaffDetailsService {
  create(createStaffDetailDto: CreateStaffDetailDto) {
    return 'This action adds a new staffDetail';
  }

  findAll() {
    return `This action returns all staffDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staffDetail`;
  }

  update(id: number, updateStaffDetailDto: UpdateStaffDetailDto) {
    return `This action updates a #${id} staffDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} staffDetail`;
  }
}
