export enum UserRole {


  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
  PATIENT = 'PATIENT',
  STAFF = 'STAFF',
}
export enum DefaultStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE',
  DELETED = 'DELETED',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

export enum AIType {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}


export enum PermissionAction {
  CREATE = 'Create',
  READ = 'Read',
  UPDATE = 'Update',
  DELETE = 'Delete',
  MANAGE = "MANAGE",
}

export enum PageType {
  TNC = 'TERMS & CONDITIONS',
  PRIVACY_POLICY = 'PRIVACY POLICY',
  DATA_POLICY = 'DATA POLICY',
}


export enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
  UNKNOWN = 'Unknown'
}

export enum MaritalStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
  OTHER = 'Other'
}
export enum CaseStatus {
  NEW = 'NEW',
  IN_CONSULTATION = 'IN_CONSULTATION',
  TREATED = 'TREATED',
  CLOSED = 'CLOSED',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CHECKED_IN = 'CHECKED_IN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum AppointmentType {
  WALK_IN = 'WALK_IN',
  SCHEDULED = 'SCHEDULED',
}
export enum MedicineForm {
  TABLET = 'TABLET',
  CAPSULE = 'CAPSULE',
  SYRUP = 'SYRUP',
  INJECTION = 'INJECTION',
  CREAM = 'CREAM',
  OINTMENT = 'OINTMENT',
  DROPS = 'DROPS',
  INHALER = 'INHALER',
  POWDER = 'POWDER',
  SPRAY = 'SPRAY',
  OTHER = 'OTHER',
}

export enum MedicineCategoryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

export enum StockStatus {
  AVAILABLE = 'AVAILABLE',
  LOW = 'LOW',
  EXPIRED = 'EXPIRED',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}





