import { PartialType } from '@nestjs/swagger';
import { CreateStaffDetailDto } from './create-staff-detail.dto';

export class UpdateStaffDetailDto extends PartialType(CreateStaffDetailDto) {}
