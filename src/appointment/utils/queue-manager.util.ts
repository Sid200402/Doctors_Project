import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';

@Injectable()
export class QueueManagerUtil {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async getWaitingQueue(): Promise<Appointment[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return this.appointmentRepository.find({
      where: {
        appointmentDateTime: Between(today, tomorrow),
        status: AppointmentStatus.CHECKED_IN,
      },
      relations: ['patient', 'doctor'],
      order: { checkInTime: 'ASC' },
    });
  }

  async getInProgressQueue(): Promise<Appointment[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return this.appointmentRepository.find({
      where: {
        appointmentDateTime: Between(today, tomorrow),
        status: AppointmentStatus.IN_PROGRESS,
      },
      relations: ['patient', 'doctor'],
      order: { consultationStartTime: 'ASC' },
    });
  }

  async getCompletedQueue(): Promise<Appointment[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return this.appointmentRepository.find({
      where: {
        appointmentDateTime: Between(today, tomorrow),
        status: AppointmentStatus.COMPLETED,
      },
      relations: ['patient', 'doctor'],
      order: { consultationEndTime: 'ASC' },
    });
  }

  async getQueueByDoctor(doctorId: string): Promise<any> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const [waiting, inProgress, completed] = await Promise.all([
      this.appointmentRepository.find({
        where: {
          doctorId,
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.CHECKED_IN,
        },
        relations: ['patient'],
        order: { checkInTime: 'ASC' },
      }),
      this.appointmentRepository.find({
        where: {
          doctorId,
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.IN_PROGRESS,
        },
        relations: ['patient'],
        order: { consultationStartTime: 'ASC' },
      }),
      this.appointmentRepository.find({
        where: {
          doctorId,
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.COMPLETED,
        },
        relations: ['patient'],
        order: { consultationEndTime: 'ASC' },
      }),
    ]);
    
    return {
      waiting,
      inProgress,
      completed,
    };
  }

  async getQueueSummary(): Promise<any> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const [waiting, inProgress, completed, scheduled, cancelled, noShow] = await Promise.all([
      this.appointmentRepository.count({
        where: {
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.CHECKED_IN,
        },
      }),
      this.appointmentRepository.count({
        where: {
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.IN_PROGRESS,
        },
      }),
      this.appointmentRepository.count({
        where: {
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.COMPLETED,
        },
      }),
      this.appointmentRepository.count({
        where: {
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.SCHEDULED,
        },
      }),
      this.appointmentRepository.count({
        where: {
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.CANCELLED,
        },
      }),
      this.appointmentRepository.count({
        where: {
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.NO_SHOW,
        },
      }),
    ]);
    
    return {
      waiting,
      inProgress,
      completed,
      scheduled,
      cancelled,
      noShow,
      total: waiting + inProgress + completed + scheduled + cancelled + noShow,
    };
  }

  async getAverageWaitTime(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const completedAppointments = await this.appointmentRepository.find({
      where: {
        appointmentDateTime: Between(today, tomorrow),
        status: AppointmentStatus.COMPLETED,
      },
      select: ['checkInTime', 'consultationStartTime'],
    });
    
    if (completedAppointments.length === 0) {
      return 0;
    }
    
    let totalWaitTimeMinutes = 0;
    
    completedAppointments.forEach(appointment => {
      if (appointment.checkInTime && appointment.consultationStartTime) {
        const waitTimeMs = appointment.consultationStartTime.getTime() - appointment.checkInTime.getTime();
        totalWaitTimeMinutes += waitTimeMs / (1000 * 60); // Convert to minutes
      }
    });
    
    return Math.round(totalWaitTimeMinutes / completedAppointments.length);
  }

  async getAverageConsultationTime(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const completedAppointments = await this.appointmentRepository.find({
      where: {
        appointmentDateTime: Between(today, tomorrow),
        status: AppointmentStatus.COMPLETED,
      },
      select: ['consultationStartTime', 'consultationEndTime'],
    });
    
    if (completedAppointments.length === 0) {
      return 0;
    }
    
    let totalConsultationTimeMinutes = 0;
    
    completedAppointments.forEach(appointment => {
      if (appointment.consultationStartTime && appointment.consultationEndTime) {
        const consultationTimeMs = appointment.consultationEndTime.getTime() - appointment.consultationStartTime.getTime();
        totalConsultationTimeMinutes += consultationTimeMs / (1000 * 60); // Convert to minutes
      }
    });
    
    return Math.round(totalConsultationTimeMinutes / completedAppointments.length);
  }
}