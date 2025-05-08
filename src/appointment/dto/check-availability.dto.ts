import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CheckAvailabilityDto {
  @IsNotEmpty()
  @IsUUID()
  doctorId: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsUUID()
  appointmentId?: string; // For excluding current appointment when checking availability for updates
}