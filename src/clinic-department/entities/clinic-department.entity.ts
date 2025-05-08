
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clinic } from '../../clinic/entities/clinic.entity';


@Entity()
export class ClinicDepartment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 100 })
	name: string;

	@ManyToOne(() => Clinic, (clinic) => clinic.departments, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'clinicId' })
	clinic: Clinic;

	@Column({ type: 'uuid' })
	clinicId: string;
}
