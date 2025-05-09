import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { MedicineStock } from '../../medicine-stock/entities/medicine-stock.entity';
import { PrescribedMedicine } from '../../prescribed-medicine/entities/prescribed-medicine.entity';
import { MedicineCategory } from '../../medicine-category/entities/medicine-category.entity';
import { MedicineForm } from '../../enum';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  composition: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  brand: string;

  @ManyToOne(() => MedicineCategory, category => category.medicines, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: MedicineCategory;

  @Column({ type: 'uuid', nullable: true })
  categoryId: string;

  @Column({ type: 'enum', enum: MedicineForm, default: MedicineForm.TABLET })
  form: MedicineForm;

  @Column({ type: 'varchar', length: 100, nullable: true })
  strength: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  dosageInstructions: string;

  @Column({ type: 'text', nullable: true })
  sideEffects: string;

  @Column({ type: 'text', nullable: true })
  contraindications: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  manufacturer: string;

  @Column({ type: 'integer', nullable: true, default: 0 })
  usageFrequency: number;

  @Column({ type: 'boolean', default: false })
  isTopUsed: boolean;

  @Column({ type: 'integer', nullable: true })
  minimumStockLevel: number;

  @Column({ type: 'date', nullable: true })
  expiryAlertDate: Date;

  @OneToMany(() => MedicineStock, (stock) => stock.medicine)
  stock: MedicineStock[];

  @OneToMany(() => PrescribedMedicine, (prescribedMedicine) => prescribedMedicine.medicine)
  prescribedMedicines: PrescribedMedicine[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
