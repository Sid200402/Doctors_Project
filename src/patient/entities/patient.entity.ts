import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { BloodGroup, Gender, MaritalStatus } from '../../enum';
import { MedicalHistory } from '../../medical-history/entities/medical-history.entity';
import { Visit } from '../../visit/entities/visit.entity';
import { Prescription } from '../../prescription/entities/prescription.entity';
import { Case } from '../../case/entities/case.entity';


@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column({ type: 'varchar', length: 100, nullable: false })
  patientname: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
  gender: Gender;

  @Column({ type: 'varchar', length: 20, nullable: true })
  callNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'enum', enum: BloodGroup, default: BloodGroup.UNKNOWN, nullable: true })
  bloodGroup: BloodGroup;

  @Column({ type: 'varchar', length: 100, nullable: true })
  emergencyContact: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  emergencyContactName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  occupation: string;

  @Column({ type: 'enum', enum: MaritalStatus, nullable: true })
  maritalStatus: MaritalStatus;

  @Column({ type: 'text', nullable: true })
  allergies: string;

  @Column({ type: 'text', nullable: true })
  chronicConditions: string;

  @Column({ type: 'text', nullable: true })
  profile: string;

  @Column({ type: 'text', nullable: true })
  profileName: string;

  @Column({ type: 'text', nullable: true })
  aadhar: string;

  @Column({ type: 'text', nullable: true })
  aadharPath: string;

  @Column({ type: 'text', nullable: true })
  insurance: string;

  @Column({ type: 'text', nullable: true })
  insurancePath: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  insuranceNumber: string;

  @Column({ type: 'date', nullable: true })
  insuranceExpiryDate: Date;

  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
  medicalHistories: MedicalHistory[];

  @OneToMany(() => Visit, (visit) => visit.patient)
  visits: Visit[];

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescriptions: Prescription[];

  @OneToMany(() => Case, (caseEntity) => caseEntity.patient)
  cases: Case[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
