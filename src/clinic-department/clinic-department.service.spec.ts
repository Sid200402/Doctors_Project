import { Test, TestingModule } from '@nestjs/testing';
import { ClinicDepartmentService } from './clinic-department.service';

describe('ClinicDepartmentService', () => {
  let service: ClinicDepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicDepartmentService],
    }).compile();

    service = module.get<ClinicDepartmentService>(ClinicDepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
