import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prescription } from '../../prescription/entities/prescription.entity';
import { Medicine } from '../../medicine/entities/medicine.entity';


@Entity()
export class PrescribedMedicine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Prescription, (prescription) => prescription.prescribedMedicines, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prescriptionId' })
  prescription: Prescription;

  @Column({ type: 'uuid' })
  prescriptionId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  disease: string;

  @ManyToOne(() => Medicine)
  @JoinColumn({ name: 'medicineId' })
  medicine: Medicine;

  @Column({ type: 'uuid' })
  medicineId: string;

  @Column({ type: 'varchar', length: 100 })
  dosage: string;

  @Column({ type: 'varchar', length: 100 })
  frequency: string;

  @Column({ type: 'varchar', length: 100 })
  duration: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  route?: string;

  @Column({ type: 'text', nullable: true })
  instructions?: string;
}
