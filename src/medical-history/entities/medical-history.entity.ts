import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Report } from '../../reports/entities/report.entity';

@Entity()
export class MedicalHistory {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Patient, (patient) => patient.medicalHistories, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'patientId' })
	patient: Patient;

	@Column({ type: 'uuid' })
	patientId: string;

	@Column({ type: 'date', nullable: true })
	diagnosisDate?: Date;

	@Column({ type: 'text', nullable: true })
	treatmentDetails?: string;

	@Column({ type: 'varchar', length: 100 })
	historyType: string;

	@Column({ type: 'varchar', length: 255 })
	condition: string;

	@OneToMany(() => Report, (report) =>report.medHis , { cascade: true })
	documents: Report[];

	@Column({ type: 'text', nullable: true })
	notes?: string;
}
