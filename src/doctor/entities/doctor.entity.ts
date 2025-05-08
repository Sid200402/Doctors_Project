import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Clinic } from '../../clinic/entities/clinic.entity';


@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  specialization?: string;

  @ManyToOne(() => Clinic, (clinic) => clinic.doctors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clinicId' })
  clinic: Clinic;

  @Column({ type: 'uuid' })
  clinicId: string; // Foreign key

//   @OneToMany(() => Visit, (visit) => visit.doctor)
//   visits: Visit[];

//   @OneToMany(() => Prescription, (prescription) => prescription.doctor)
//   prescriptions: Prescription[];

//   @OneToMany(() => PrescriptionTemplate, (template) => template.doctor)
//   prescriptionTemplates: PrescriptionTemplate[];

//   @OneToMany(() => Case, (caseEntity) => caseEntity.doctor)
//   cases: Case[];
}
