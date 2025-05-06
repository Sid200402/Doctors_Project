import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { MedicalHistoryType } from '../../enum';

@Entity()
export class MedicalHistory {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'uuid', nullable: true })
	patientId: string;

	@ManyToOne(() => Patient, patient => patient.medicalHistories, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	patient: Patient;

	@Column({ type: 'enum', enum: MedicalHistoryType, default: MedicalHistoryType.DISEASE })
	type: MedicalHistoryType;

	@Column({ type: 'text', nullable: true })
	desc: string;

	@Column({ nullable: true })
	occurredOn: Date;

	@Column({ type: 'text', nullable: true })
	file: string;

	@Column({ type: 'text', nullable: true })
	fileName: string;

	@CreateDateColumn()
	createdAt: Date;
}
