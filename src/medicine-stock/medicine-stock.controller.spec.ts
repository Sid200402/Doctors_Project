import { Test, TestingModule } from '@nestjs/testing';
import { MedicineStockController } from './medicine-stock.controller';
import { MedicineStockService } from './medicine-stock.service';

describe('MedicineStockController', () => {
  let controller: MedicineStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineStockController],
      providers: [MedicineStockService],
    }).compile();

    controller = module.get<MedicineStockController>(MedicineStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
