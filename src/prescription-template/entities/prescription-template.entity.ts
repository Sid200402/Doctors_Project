import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Doctor } from '../../doctor/entities/doctor.entity';
import { PrescriptionTemplateItem } from './prescription-template-item.entity';

@Entity()
export class PrescriptionTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Doctor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @Column({ type: 'uuid' })
  doctorId: string;

  @OneToMany(() => PrescriptionTemplateItem, (item) => item.template, { cascade: true, eager: true })
  items: PrescriptionTemplateItem[];

  @CreateDateColumn()
  createdAt: Date;
}