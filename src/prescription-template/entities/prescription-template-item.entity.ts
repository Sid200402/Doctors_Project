import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PrescriptionTemplate } from './prescription-template.entity';
import { Medicine } from '../../medicine/entities/medicine.entity';

@Entity()
export class PrescriptionTemplateItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PrescriptionTemplate, (template) => template.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'templateId' })
  template: PrescriptionTemplate;

  @Column({ type: 'uuid' })
  templateId: string;

  @ManyToOne(() => Medicine, { nullable: true })
  @JoinColumn({ name: 'medicineId' })
  medicine: Medicine;

  @Column({ type: 'uuid', nullable: true })
  medicineId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  medicineName: string;

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