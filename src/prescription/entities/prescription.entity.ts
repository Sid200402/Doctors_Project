import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Visit } from '../../visit/entities/visit.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { Patient } from '../../patient/entities/patient.entity';
import { PrescribedMedicine } from '../../prescribed-medicine/entities/prescribed-medicine.entity';


@Entity()
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Visit, (visit) => visit.prescriptions, { onDelete: 'CASCADE' })
  visit: Visit;

  @Column({ type: 'uuid' })
  visitId: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.prescriptions, { onDelete: 'CASCADE' })
  doctor: Doctor;

  @Column({ type: 'uuid' })
  doctorId: string;

  @ManyToOne(() => Patient, (patient) => patient.prescriptions, { onDelete: 'CASCADE' })
  patient: Patient;

  @Column({ type: 'uuid' })
  patientId: string;

  @CreateDateColumn()
  prescriptionDate: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => PrescribedMedicine, (prescribedMedicine) => prescribedMedicine.prescription, { cascade: true, eager: true })
  prescribedMedicines: PrescribedMedicine[];
}
