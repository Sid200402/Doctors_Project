import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MedicalHistory } from '../../medical-history/entities/medical-history.entity';

@Entity()
export class Report {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => MedicalHistory, (medHis) => medHis.documents, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'medicalHistoryId' })
	medHis: MedicalHistory;

	@Column({ type: 'uuid' })
	medicalHistoryId: string;

	@Column({ type: 'varchar', length: 255 })
	documentType: string;

	@Column({ type: 'varchar', length: 255 })
	filePath: string;

	@CreateDateColumn()
	uploadDate: Date;
}
