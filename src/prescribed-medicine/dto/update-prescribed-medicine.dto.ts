import { IsOptional, IsUUID, Length } from 'class-validator';

export class UpdatePrescribedMedicineDto {
	@IsOptional()
	@IsUUID()
	prescriptionId: string;

	@IsOptional()
	@Length(1, 100)
	disease: string;

	@IsOptional()
	@IsUUID()
	medicineId: string;

	@IsOptional()
	@Length(1, 100)
	dosage: string;

	@IsOptional()
	@Length(1, 100)
	frequency: string;

	@IsOptional()
	@Length(1, 100)
	duration: string;

	@IsOptional()
	@Length(1, 100)
	route?: string;

	@IsOptional()
	instructions: string;
}
