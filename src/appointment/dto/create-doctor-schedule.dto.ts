import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { WeekDay } from '../entities/doctor-schedule.entity';

export class CreateDoctorScheduleDto {
  @IsNotEmpty()
  @IsUUID()
  doctorId: string;

  @IsNotEmpty()
  @IsEnum(WeekDay)
  weekDay: WeekDay;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsInt()
  @Min(5)
  slotDurationMinutes: number;

  @IsOptional()
  isAvailable?: boolean;
}