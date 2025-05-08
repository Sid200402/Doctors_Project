import { Test, TestingModule } from '@nestjs/testing';
import { PrescribedMedicineService } from './prescribed-medicine.service';

describe('PrescribedMedicineService', () => {
  let service: PrescribedMedicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescribedMedicineService],
    }).compile();

    service = module.get<PrescribedMedicineService>(PrescribedMedicineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
