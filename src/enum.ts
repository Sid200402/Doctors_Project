export enum UserRole {
	ADMIN = 'ADMIN',
	DOCTOR = 'DOCTOR',
	STAFF = 'STAFF',
	PATIENT = 'PATIENT',
	PHARMACIST = 'PHARMACIST',
  }

  export enum DefaultStatus {
	ACTIVE = 'ACTIVE',
	DEACTIVE = 'DEACTIVE',
	DELETED = 'DELETED',
	SUSPENDED = 'SUSPENDED',
	PENDING = 'PENDING',
  }
  export enum AIType {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
  }
  export enum LogType {
	LOGIN = 'IN',
	LOGOUT = 'OUT',
  }

  export enum PatientDocumentType {
	AAdhar = 'AAdhar',
	INSURANCE = 'Insurance',
	REPORT = 'Report',
	OTHER = 'Other',

  }

  export enum MedicalHistoryType {
	ALLERGY = 'allergy',
	SURGERY = 'surgery',
	DISEASE = 'disease',
  }

  export enum PatientStatus {
	ACTIVE = 'ACTIVE',
	DEACTIVE = 'DEACTIVE',
	DELETED = 'DELETED',
	SUSPENDED = 'SUSPENDED',
	PENDING = 'PENDING',
  }
  export enum Gender {
	MALE = 'Male',
	FEMALE = 'Female',
	OTHER = 'Other',
  }

  export enum PermissionAction {
	CREATE = 'Create',
	READ = 'Read',
	UPDATE = 'Update',
	DELETE = 'Delete',
	MANAGE = "MANAGE",
  }
  

