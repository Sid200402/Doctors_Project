import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AppointmentStatus, AppointmentType } from '../entities/appointment.entity';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsUUID()
  doctorId?: string;

  @IsOptional()
  @IsDateString()
  appointmentDateTime?: Date;

  @IsOptional()
  @IsEnum(AppointmentType)
  appointmentType?: AppointmentType;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  checkInTime?: Date;

  @IsOptional()
  @IsDateString()
  consultationStartTime?: Date;

  @IsOptional()
  @IsDateString()
  consultationEndTime?: Date;
}