import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Medicine } from '../../medicine/entities/medicine.entity';
import { StockStatus } from '../../enum';

@Entity()
export class MedicineStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Medicine, (medicine) => medicine.stock, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'medicineId' })
  medicine: Medicine;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'integer', nullable: true })
  consumedQuantity: number;

  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  batchNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  vendorName: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: StockStatus, default: StockStatus.AVAILABLE})
  status: StockStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
