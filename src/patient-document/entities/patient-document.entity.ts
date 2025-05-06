import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { PatientDocumentType } from '../../enum';


@Entity()
export class PatientDocument {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'uuid', nullable: true })
	pataintId: string;

	@ManyToOne(() => Patient, patient => patient.documents, {
		cascade: true,
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	  })
	patient: Patient;

	@Column({ type: 'enum', enum: PatientDocumentType, default: PatientDocumentType.OTHER })
	type: PatientDocumentType

	@Column({ type: 'text', nullable: true })
	file: string;

	@Column({ type: 'text', nullable: true })
	fileName: string;

	@CreateDateColumn()
	uploadedAt: Date;
}
