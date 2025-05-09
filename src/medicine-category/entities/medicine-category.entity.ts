import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Medicine } from '../../medicine/entities/medicine.entity';
import { MedicineCategoryStatus } from '../../enum';

@Entity()
export class MedicineCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: MedicineCategoryStatus, default: MedicineCategoryStatus.ACTIVE })
  status: MedicineCategoryStatus;

  @OneToMany(() => Medicine, medicine => medicine.category)
  medicines: Medicine[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
