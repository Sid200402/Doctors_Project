import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MedicineStock } from '../../medicine-stock/entities/medicine-stock.entity';


@Entity()
export class Medicine {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 255, unique: true })
	name: string;

	@Column({ type: 'text', nullable: true })
	composition?: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	brand?: string;

	@Column({ type: 'varchar', length: 100, nullable: true })
	category?: string;

	@OneToMany(() => MedicineStock, (stock) => stock.medicine)
	stock: MedicineStock[];

	//   @OneToMany(() => PrescribedMedicine, (prescribedMedicine) => prescribedMedicine.medicine)
	//   prescribedMedicines: PrescribedMedicine[];

}
