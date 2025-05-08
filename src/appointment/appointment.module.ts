import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { DoctorSchedule } from './entities/doctor-schedule.entity';
import { Holiday } from './entities/holiday.entity';
import { QueueManagerUtil } from './utils/queue-manager.util';
import { Room } from './entities/room.entity';
import { Resource } from './entities/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, DoctorSchedule, Holiday, Room, Resource])],
  controllers: [AppointmentController],
  providers: [AppointmentService, QueueManagerUtil],
  exports: [AppointmentService, QueueManagerUtil],
})
export class AppointmentModule {}