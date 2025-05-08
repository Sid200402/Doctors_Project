import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';
import { QueueManagerUtil } from './utils/queue-manager.util';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly queueManager: QueueManagerUtil,
  ) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.appointmentService.findByPatient(patientId);
  }

  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.appointmentService.findByDoctor(doctorId);
  }

  @Get('date/:date')
  findByDate(@Param('date') date: string) {
    return this.appointmentService.findByDate(new Date(date));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }

  @Post(':id/check-in')
  checkIn(@Param('id') id: string) {
    return this.appointmentService.checkIn(id);
  }

  @Post(':id/start-consultation')
  startConsultation(@Param('id') id: string) {
    return this.appointmentService.startConsultation(id);
  }

  @Post(':id/complete-consultation')
  completeConsultation(@Param('id') id: string) {
    return this.appointmentService.completeConsultation(id);
  }

  @Post(':id/cancel')
  cancelAppointment(@Param('id') id: string) {
    return this.appointmentService.cancelAppointment(id);
  }

  @Post(':id/no-show')
  markNoShow(@Param('id') id: string) {
    return this.appointmentService.markNoShow(id);
  }

  @Post('check-availability')
  checkAvailability(@Body() checkDto: CheckAvailabilityDto) {
    return this.appointmentService.checkAvailability(checkDto);
  }

  // Doctor Schedule Endpoints
  @Post('schedule')
  createDoctorSchedule(@Body() createScheduleDto: CreateDoctorScheduleDto) {
    return this.appointmentService.createDoctorSchedule(createScheduleDto);
  }

  @Get('schedule/doctor/:doctorId')
  getDoctorSchedule(@Param('doctorId') doctorId: string) {
    return this.appointmentService.getDoctorSchedule(doctorId);
  }

  @Patch('schedule/:id')
  updateDoctorSchedule(@Param('id') id: string, @Body() updateScheduleDto: any) {
    return this.appointmentService.updateDoctorSchedule(id, updateScheduleDto);
  }

  @Delete('schedule/:id')
  removeDoctorSchedule(@Param('id') id: string) {
    return this.appointmentService.removeDoctorSchedule(id);
  }

  // Holiday Endpoints
  @Post('holiday')
  createHoliday(@Body() createHolidayDto: CreateHolidayDto) {
    return this.appointmentService.createHoliday(createHolidayDto);
  }

  @Get('holiday')
  getHolidays() {
    return this.appointmentService.getHolidays();
  }

  @Get('holiday/clinic/:clinicId')
  getHolidaysByClinic(@Param('clinicId') clinicId: string) {
    return this.appointmentService.getHolidaysByClinic(clinicId);
  }

  @Delete('holiday/:id')
  removeHoliday(@Param('id') id: string) {
    return this.appointmentService.removeHoliday(id);
  }

  // Queue Management Endpoints
  @Get('queue/waiting')
  getWaitingQueue() {
    return this.queueManager.getWaitingQueue();
  }

  @Get('queue/in-progress')
  getInProgressQueue() {
    return this.queueManager.getInProgressQueue();
  }

  @Get('queue/completed')
  getCompletedQueue() {
    return this.queueManager.getCompletedQueue();
  }

  @Get('queue/doctor/:doctorId')
  getQueueByDoctor(@Param('doctorId') doctorId: string) {
    return this.queueManager.getQueueByDoctor(doctorId);
  }

  @Get('queue/summary')
  getQueueSummary() {
    return this.queueManager.getQueueSummary();
  }

  @Get('queue/analytics/wait-time')
  getAverageWaitTime() {
    return this.queueManager.getAverageWaitTime();
  }

  @Get('queue/analytics/consultation-time')
  getAverageConsultationTime() {
    return this.queueManager.getAverageConsultationTime();
  }

  // Dashboard Endpoints
  @Get('dashboard/doctor/:doctorId')
  getDoctorDashboard(@Param('doctorId') doctorId: string) {
    return this.appointmentService.getDoctorDashboard(doctorId);
  }

  @Get('dashboard/clinic')
  getClinicDashboard() {
    return this.appointmentService.getClinicDashboard();
  }
}