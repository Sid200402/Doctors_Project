export enum UserRole {
    
    DOCTOR = 'DOCTOR',
    ADMIN = 'ADMIN',
    PATIENT = 'PATIENT',
    STAFF='STAFF',
  }
  export enum DefaultStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVE = 'DEACTIVE',
    DELETED = 'DELETED',
    SUSPENDED = 'SUSPENDED',
    PENDING = 'PENDING',
  }
 
  export enum Gender{
    MALE = 'MALE',
    FEMALE="FEMALE",
    OTHER="OTHER"
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
  