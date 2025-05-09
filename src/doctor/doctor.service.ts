import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { PaginationDto, UpdateDoctorDto } from './dto/update-doctor.dto';
import { Brackets, Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';

@Injectable()

export class DoctorService {

  constructor(
    @InjectRepository(Doctor)
    private readonly DoctorRepo: Repository<Doctor>,
    @InjectRepository(Account)private readonly AccountRepo: Repository<Account>,
  ) {}
  async getProfile(id: string) {
    const result = await this.AccountRepo.createQueryBuilder('account')
      .leftJoinAndSelect('account.doctor', 'doctor')
      .select([
        'account.id',
        'account.email',
        'account.roles',
        'account.status',
        'doctorDetail.id',
        'doctorDetail.name',
        'doctorDetail.email',
        'doctorDetail.designation',
        'doctorDetail.specialization',
        'doctorDetail. collegeName',
        'doctorDetail.studyYear',
        'doctorDetail.clinicName',
        'doctorDetail.experienceYears',
        'doctorDetail.accountId',
      
      ])
      .where('doctorDetail.accountId = :id', { id: id })
      .getOne();
    if (!result) {
      throw new NotFoundException('User not found!');
    }
    return result;
  }

  async findAll(dto: PaginationDto) {
    const keyword = dto.keyword || '';
    const [result, total] = await this.DoctorRepo.createQueryBuilder(
      'doctorDetail',
    )
      .leftJoinAndSelect('doctorDetail.account', 'account')
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'account.email LIKE :email OR doctorDetail.name LIKE :name ',
            {
              email: '%' + keyword + '%',
              name: '%' + keyword + '%',
            },
          );
        }),
      )
      .skip(dto.offset)
      .take(dto.limit)
      .orderBy({ 'doctorDetail.name': 'ASC' })
      .getManyAndCount();
    return { result, total };
  }

  async getdoctorById(doctorId: string) {
    const DoctorDetail = await this.DoctorRepo.createQueryBuilder(
      'doctorDetail',
    )
      .where('doctorDetail.id = :id', { id: doctorId })
      .getOne();
    return DoctorDetail;
  }

  async update(id: string, dto:UpdateDoctorDto) {
    const result = await this.DoctorRepo.findOne({ where: { accountId: id } });
    if (!result) {
      throw new NotFoundException('doctor not found!');
    }
    const obj = Object.assign(result, dto);
    return this.DoctorRepo.save(obj);
  }

  async profileImage(image: string, result: Doctor) {
    const obj = Object.assign(result, {
      profileimage: process.env.PORT+ image,
      profileimagePath: image,
    });
    return this.DoctorRepo.save(obj);
  }

  async findDoctor(id: string) {
    const result = await this.DoctorRepo.createQueryBuilder('doctorDetail') 
      .where('doctorDetail.accountId = :accountId', { accountId: id })
      .getOne();
    if (!result) {
      throw new NotFoundException('doctor details  not found!');
    }
    return result;
  }
}
