
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Medicine } from '../../medicine/entities/medicine.entity';

@Entity()
export class MedicineStock  {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Medicine, (medicine) => medicine.stock, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medicineId' })
  medicine: Medicine;

  @Column({ type: 'uuid' })
  medicineId: string; 

  @Column({ type: 'varchar', length: 255 })
  batchNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  vendor?: string;

  @Column({ type: 'date' })
  expiryDate: Date;

  @Column({ type: 'integer' })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
