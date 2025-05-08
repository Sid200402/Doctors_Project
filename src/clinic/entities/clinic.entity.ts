import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClinicDepartment } from '../../clinic-department/entities/clinic-department.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';


@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => ClinicDepartment, (department) => department.clinic)
  departments: ClinicDepartment[];

  @OneToMany(() => Doctor, (doctor) => doctor.clinic)
  doctors: Doctor[];

//   @OneToMany(() => Room, (room) => room.clinic)
//   rooms: Room[];
}
