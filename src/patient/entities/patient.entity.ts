import {
	Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { PatientDocument } from '../../patient-document/entities/patient-document.entity';
import { MedicalHistory } from '../../medical-history/entities/medical-history.entity';
import { Gender } from '../../enum';


@Entity()
export class Patient {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'uuid', nullable: true })
	accountId: string;

	@OneToOne(() => Account)
	account: Account;

	@Column({ type: 'varchar', length: 55, nullable: true })
	fullName: string;

	@Column({ type: 'varchar', length: 20, nullable: true })
	age: number;

	@Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
	gender: Gender;

	@Column({ type: 'varchar', length: 100, nullable: true })
	callNumber: string;

	@Column({ type: 'text', nullable: true })
	profile: string;

	@Column({ type: 'text', nullable: true })
	profileName: string;

	@OneToMany(() => PatientDocument, (patientDocument) => patientDocument.patient)
	documents: PatientDocument[];

	@OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.patient)
	medicalHistories: MedicalHistory[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
