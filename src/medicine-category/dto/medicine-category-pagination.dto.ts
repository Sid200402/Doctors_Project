import { IsOptional, IsString } from 'class-validator';

export class MedicineCategoryPaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = 'name';

  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  includeInactive?: boolean = false;
}