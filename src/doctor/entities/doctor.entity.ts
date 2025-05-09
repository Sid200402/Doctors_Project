import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Prescription } from '../../prescription/entities/prescription.entity';
import { Account } from 'src/account/entities/account.entity';


@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  specialization?: string;

  @Column({  type: 'varchar', length: 55, nullable: true})
  collegeName: string;

  @Column({type:'int', nullable: true})
  experienceYears: number;

  @Column({ type: 'text', nullable: true })
  profileimage: string;

  @Column({ type: 'text', nullable: true })
  profileimagePath: string;

  @Column({ type: 'uuid', nullable: true })
  accountId: string;


  
  @ManyToOne(() => Account, (account) => account.doctor)
  account: Account;

//   @OneToMany(() => Visit, (visit) => visit.doctor)
//   visits: Visit[];

@OneToMany(() => Prescription, (prescription) => prescription.doctor)
prescriptions: Prescription[];

//   @OneToMany(() => PrescriptionTemplate, (template) => template.doctor)
//   prescriptionTemplates: PrescriptionTemplate[];

//   @OneToMany(() => Case, (caseEntity) => caseEntity.doctor)
//   cases: Case[];
}
