import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Appointment, AppointmentStatus, AppointmentType } from './entities/appointment.entity';
import { DoctorSchedule, WeekDay } from './entities/doctor-schedule.entity';
import { Holiday } from './entities/holiday.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { AppointmentSlotDto } from './dto/appointment-slot.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(DoctorSchedule)
    private doctorScheduleRepository: Repository<DoctorSchedule>,
    @InjectRepository(Holiday)
    private holidayRepository: Repository<Holiday>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { appointmentDateTime } = createAppointmentDto;
    
    // Check if the appointment time is available
    const isAvailable = await this.isTimeSlotAvailable(
      createAppointmentDto.doctorId,
      new Date(appointmentDateTime),
    );
    
    if (!isAvailable) {
      throw new BadRequestException('The selected time slot is not available');
    }
    
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['patient', 'doctor'],
      order: { appointmentDateTime: 'DESC' },
    });
  }

  async findByPatient(patientId: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { patientId },
      relations: ['patient', 'doctor'],
      order: { appointmentDateTime: 'DESC' },
    });
  }

  async findByDoctor(doctorId: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { doctorId },
      relations: ['patient', 'doctor'],
      order: { appointmentDateTime: 'DESC' },
    });
  }

  async findByDate(date: Date): Promise<Appointment[]> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    return this.appointmentRepository.find({
      where: {
        appointmentDateTime: Between(startDate, endDate),
      },
      relations: ['patient', 'doctor'],
      order: { appointmentDateTime: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor'],
    });
    
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    
    // If appointment time is being updated, check availability
    if (updateAppointmentDto.appointmentDateTime && 
        updateAppointmentDto.appointmentDateTime.toString() !== appointment.appointmentDateTime.toString()) {
      
      const isAvailable = await this.isTimeSlotAvailable(
        updateAppointmentDto.doctorId || appointment.doctorId,
        new Date(updateAppointmentDto.appointmentDateTime),
        id,
      );
      
      if (!isAvailable) {
        throw new BadRequestException('The selected time slot is not available');
      }
    }
    
    Object.assign(appointment, updateAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.appointmentRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }

  async checkIn(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);
    
    appointment.status = AppointmentStatus.CHECKED_IN;
    appointment.checkInTime = new Date();
    
    return this.appointmentRepository.save(appointment);
  }

  async startConsultation(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);
    
    appointment.status = AppointmentStatus.IN_PROGRESS;
    appointment.consultationStartTime = new Date();
    
    return this.appointmentRepository.save(appointment);
  }

  async completeConsultation(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);
    
    appointment.status = AppointmentStatus.COMPLETED;
    appointment.consultationEndTime = new Date();
    
    return this.appointmentRepository.save(appointment);
  }

  async cancelAppointment(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);
    
    appointment.status = AppointmentStatus.CANCELLED;
    
    return this.appointmentRepository.save(appointment);
  }

  async markNoShow(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);
    
    appointment.status = AppointmentStatus.NO_SHOW;
    
    return this.appointmentRepository.save(appointment);
  }

  // Doctor Schedule Management
  async createDoctorSchedule(createScheduleDto: CreateDoctorScheduleDto): Promise<DoctorSchedule> {
    // Check if schedule already exists for this doctor and day
    const existingSchedule = await this.doctorScheduleRepository.findOne({
      where: {
        doctorId: createScheduleDto.doctorId,
        weekDay: createScheduleDto.weekDay,
      },
    });
    
    if (existingSchedule) {
      throw new BadRequestException('Schedule already exists for this doctor on this day');
    }
    
    const schedule = this.doctorScheduleRepository.create(createScheduleDto);
    return this.doctorScheduleRepository.save(schedule);
  }

  async getDoctorSchedule(doctorId: string): Promise<DoctorSchedule[]> {
    return this.doctorScheduleRepository.find({
      where: { doctorId },
      order: { weekDay: 'ASC' },
    });
  }

  async updateDoctorSchedule(id: string, updateScheduleDto: any): Promise<DoctorSchedule> {
    const schedule = await this.doctorScheduleRepository.findOne({
      where: { id },
    });
    
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    
    Object.assign(schedule, updateScheduleDto);
    return this.doctorScheduleRepository.save(schedule);
  }

  async removeDoctorSchedule(id: string): Promise<void> {
    const result = await this.doctorScheduleRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
  }

  // Holiday Management
  async createHoliday(createHolidayDto: CreateHolidayDto): Promise<Holiday> {
    const holiday = this.holidayRepository.create(createHolidayDto);
    return this.holidayRepository.save(holiday);
  }

  async getHolidays(): Promise<Holiday[]> {
    return this.holidayRepository.find({
      order: { date: 'ASC' },
    });
  }

  async getHolidaysByClinic(clinicId: string): Promise<Holiday[]> {
    return this.holidayRepository.find({
      where: [
        { clinicId },
        { clinicId: null }, // Global holidays
      ],
      order: { date: 'ASC' },
    });
  }

  async removeHoliday(id: string): Promise<void> {
    const result = await this.holidayRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Holiday with ID ${id} not found`);
    }
  }

  // Availability Checking
  async checkAvailability(checkDto: CheckAvailabilityDto): Promise<AppointmentSlotDto[]> {
    const { doctorId, date } = checkDto;
    
    const checkDate = new Date(date);
    const weekDay = this.getWeekDay(checkDate);
    
    // Check if it's a holiday
    const isHoliday = await this.isHoliday(checkDate);
    if (isHoliday) {
      return []; // No slots available on holidays
    }
    
    // Get doctor's schedule for this day
    const schedule = await this.doctorScheduleRepository.findOne({
      where: {
        doctorId,
        weekDay,
        isAvailable: true,
      },
    });
    
    if (!schedule) {
      return []; // No schedule for this day
    }
    
    // Generate time slots based on schedule
    const slots = this.generateTimeSlots(checkDate, schedule);
    
    // Check existing appointments to mark slots as unavailable
    const existingAppointments = await this.getExistingAppointments(doctorId, checkDate, checkDto.appointmentId);
    
    // Mark slots as unavailable if they overlap with existing appointments
    return this.markUnavailableSlots(slots, existingAppointments);
  }

  private getWeekDay(date: Date): WeekDay {
    const dayMap = [
      WeekDay.SUNDAY,
      WeekDay.MONDAY,
      WeekDay.TUESDAY,
      WeekDay.WEDNESDAY,
      WeekDay.THURSDAY,
      WeekDay.FRIDAY,
      WeekDay.SATURDAY,
    ];
    
    return dayMap[date.getDay()];
  }

  private async isHoliday(date: Date): Promise<boolean> {
    const formattedDate = date.toISOString().split('T')[0];
    
    const holiday = await this.holidayRepository.findOne({
      where: {
        date: formattedDate,
      },
    });
    
    return !!holiday;
  }

  private generateTimeSlots(date: Date, schedule: DoctorSchedule): AppointmentSlotDto[] {
    const slots: AppointmentSlotDto[] = [];
    
    const [startHour, startMinute] = schedule.startTime.split(':').map(Number);
    const [endHour, endMinute] = schedule.endTime.split(':').map(Number);
    
    const startDateTime = new Date(date);
    startDateTime.setHours(startHour, startMinute, 0, 0);
    
    const endDateTime = new Date(date);
    endDateTime.setHours(endHour, endMinute, 0, 0);
    
    const slotDuration = schedule.slotDurationMinutes * 60 * 1000; // Convert to milliseconds
    
    let currentSlotStart = startDateTime;
    
    while (currentSlotStart < endDateTime) {
      const currentSlotEnd = new Date(currentSlotStart.getTime() + slotDuration);
      
      if (currentSlotEnd <= endDateTime) {
        slots.push({
          startTime: currentSlotStart.toISOString(),
          endTime: currentSlotEnd.toISOString(),
          isAvailable: true,
        });
      }
      
      currentSlotStart = currentSlotEnd;
    }
    
    return slots;
  }

  private async getExistingAppointments(doctorId: string, date: Date, excludeAppointmentId?: string): Promise<Appointment[]> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const query = this.appointmentRepository.createQueryBuilder('appointment')
      .where('appointment.doctorId = :doctorId', { doctorId })
      .andWhere('appointment.appointmentDateTime BETWEEN :startDate AND :endDate', { startDate, endDate })
      .andWhere('appointment.status NOT IN (:...statuses)', { 
        statuses: [AppointmentStatus.CANCELLED, AppointmentStatus.NO_SHOW] 
      });
    
    if (excludeAppointmentId) {
      query.andWhere('appointment.id != :excludeId', { excludeId: excludeAppointmentId });
    }
    
    return query.getMany();
  }

  private markUnavailableSlots(slots: AppointmentSlotDto[], appointments: Appointment[]): AppointmentSlotDto[] {
    return slots.map(slot => {
      const slotStart = new Date(slot.startTime);
      const slotEnd = new Date(slot.endTime);
      
      // Check if this slot overlaps with any appointment
      const isOverlapping = appointments.some(appointment => {
        const appointmentTime = new Date(appointment.appointmentDateTime);
        
        // Assuming each appointment takes the full slot duration
        const appointmentEndTime = new Date(appointmentTime);
        appointmentEndTime.setMinutes(appointmentEndTime.getMinutes() + 30); // Assuming 30 min appointments
        
        return (
          (slotStart <= appointmentTime && slotEnd > appointmentTime) ||
          (slotStart < appointmentEndTime && slotEnd >= appointmentEndTime) ||
          (slotStart >= appointmentTime && slotEnd <= appointmentEndTime)
        );
      });
      
      return {
        ...slot,
        isAvailable: !isOverlapping,
      };
    });
  }

  private async isTimeSlotAvailable(doctorId: string, appointmentTime: Date, excludeAppointmentId?: string): Promise<boolean> {
    // Check if it's a holiday
    const isHoliday = await this.isHoliday(appointmentTime);
    if (isHoliday) {
      return false;
    }
    
    // Check doctor's schedule
    const weekDay = this.getWeekDay(appointmentTime);
    const schedule = await this.doctorScheduleRepository.findOne({
      where: {
        doctorId,
        weekDay,
        isAvailable: true,
      },
    });
    
    if (!schedule) {
      return false; // No schedule for this day
    }
    
    // Check if time is within doctor's working hours
    const [startHour, startMinute] = schedule.startTime.split(':').map(Number);
    const [endHour, endMinute] = schedule.endTime.split(':').map(Number);
    
    const startDateTime = new Date(appointmentTime);
    startDateTime.setHours(startHour, startMinute, 0, 0);
    
    const endDateTime = new Date(appointmentTime);
    endDateTime.setHours(endHour, endMinute, 0, 0);
    
    if (appointmentTime < startDateTime || appointmentTime >= endDateTime) {
      return false; // Outside working hours
    }
    
    // Check for overlapping appointments
    const appointmentEndTime = new Date(appointmentTime);
    appointmentEndTime.setMinutes(appointmentEndTime.getMinutes() + schedule.slotDurationMinutes);
    
    const query = this.appointmentRepository.createQueryBuilder('appointment')
      .where('appointment.doctorId = :doctorId', { doctorId })
      .andWhere('appointment.status NOT IN (:...statuses)', { 
        statuses: [AppointmentStatus.CANCELLED, AppointmentStatus.NO_SHOW] 
      })
      .andWhere(
        '(appointment.appointmentDateTime < :endTime AND DATE_ADD(appointment.appointmentDateTime, INTERVAL :duration MINUTE) > :startTime)',
        { 
          startTime: appointmentTime,
          endTime: appointmentEndTime,
          duration: schedule.slotDurationMinutes
        }
      );
    
    if (excludeAppointmentId) {
      query.andWhere('appointment.id != :excludeId', { excludeId: excludeAppointmentId });
    }
    
    const overlappingAppointments = await query.getCount();
    
    return overlappingAppointments === 0;
  }

  // Queue Management
  async getTodayQueue(): Promise<Appointment[]> {
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

  async getInConsultationPatients(): Promise<Appointment[]> {
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

  async getCompletedConsultations(): Promise<Appointment[]> {
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

  async getDoctorDashboard(doctorId: string): Promise<any> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const [scheduled, checkedIn, inProgress, completed] = await Promise.all([
      this.appointmentRepository.count({
        where: {
          doctorId,
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.SCHEDULED,
        },
      }),
      this.appointmentRepository.count({
        where: {
          doctorId,
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.CHECKED_IN,
        },
      }),
      this.appointmentRepository.count({
        where: {
          doctorId,
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.IN_PROGRESS,
        },
      }),
      this.appointmentRepository.count({
        where: {
          doctorId,
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.COMPLETED,
        },
      }),
    ]);
    
    return {
      scheduled,
      checkedIn,
      inProgress,
      completed,
      total: scheduled + checkedIn + inProgress + completed,
    };
  }

  async getClinicDashboard(): Promise<any> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const [scheduled, checkedIn, inProgress, completed] = await Promise.all([
      this.appointmentRepository.count({
        where: {
          appointmentDateTime: Between(today, tomorrow),
          status: AppointmentStatus.SCHEDULED,
        },
      }),
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
    ]);
    
    return {
      scheduled,
      checkedIn,
      inProgress,
      completed,
      total: scheduled + checkedIn + inProgress + completed,
    };
  }
}