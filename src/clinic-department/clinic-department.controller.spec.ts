import { Test, TestingModule } from '@nestjs/testing';
import { ClinicDepartmentController } from './clinic-department.controller';
import { ClinicDepartmentService } from './clinic-department.service';

describe('ClinicDepartmentController', () => {
  let controller: ClinicDepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicDepartmentController],
      providers: [ClinicDepartmentService],
    }).compile();

    controller = module.get<ClinicDepartmentController>(ClinicDepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
