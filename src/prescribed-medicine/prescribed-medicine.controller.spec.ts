import { Test, TestingModule } from '@nestjs/testing';
import { PrescribedMedicineController } from './prescribed-medicine.controller';
import { PrescribedMedicineService } from './prescribed-medicine.service';

describe('PrescribedMedicineController', () => {
  let controller: PrescribedMedicineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescribedMedicineController],
      providers: [PrescribedMedicineService],
    }).compile();

    controller = module.get<PrescribedMedicineController>(PrescribedMedicineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
