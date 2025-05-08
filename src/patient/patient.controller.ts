import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UploadedFiles, Res, Put, UseGuards, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PatientService } from './patient.service';
import { CreatePatientDto, PaginationDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.gurad';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../enum';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.PATIENT)
  create(@Body() dto: CreatePatientDto) {
    return this.patientService.create(dto);
  }

  @Get()
  findAll(@Query() dto: PaginationDto) {
    return this.patientService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Get(':id/profile')
  getPatientProfile(@Param('id') id: string) {
    return this.patientService.getPatientProfile(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Put('profile/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.PATIENT)
  // @CheckPermissions([PermissionAction.UPDATE, 'blog'])
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/patient',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async image(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileData = await this.patientService.findOne(id);
    return this.patientService.profileImage(file.path, fileData);
  }

  @Put('aadhar/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.PATIENT)
  // @CheckPermissions([PermissionAction.UPDATE, 'blog'])
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/patient',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async aadharImg(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileData = await this.patientService.findOne(id);
    return this.patientService.aadharImage(file.path, fileData);
  }

  @Put('insurence/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.PATIENT)
  // @CheckPermissions([PermissionAction.UPDATE, 'blog'])
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/patient',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async InsurenceImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileData = await this.patientService.findOne(id);
    return this.patientService.insuranceImage(file.path, fileData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }


  @Get(':id/visit-timeline')
  getPatientVisitTimeline(@Param('id') id: string) {
    return this.patientService.getPatientVisitTimeline(id);
  }

  @Get(':id/medical-history')
  getPatientMedicalHistory(@Param('id') id: string) {
    return this.patientService.getPatientMedicalHistory(id);
  }

  @Get(':id/prescriptions')
  getPatientPrescriptions(@Param('id') id: string) {
    return this.patientService.getPatientPrescriptions(id);
  }

  @Get(':id/cases')
  getPatientCases(@Param('id') id: string) {
    return this.patientService.getPatientCases(id);
  }

  @Get(':id/summary-pdf')
  async generateSummaryPdf(@Param('id') id: string) {
    return this.patientService.generatePatientSummarypdf(id);
  }

  @Get(':id/download-summary')
  async downloadSummaryPdf(@Param('id') id: string, @Res() res: Response) {
    const { filePath } = await this.patientService.generatePatientSummarypdf(id);
    const absolutePath = path.join(process.cwd(), filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="patient_summary.pdf"`);
    const fileStream = fs.createReadStream(absolutePath);
    fileStream.pipe(res);
  }

  @Get(':id/view-summary')
  async viewSummaryPdf(@Param('id') id: string, @Res() res: Response) {
    const { filePath } = await this.patientService.generatePatientSummarypdf(id);
    const absolutePath = path.join(process.cwd(), filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');

    const fileStream = fs.createReadStream(absolutePath);
    fileStream.pipe(res);
  }

}
