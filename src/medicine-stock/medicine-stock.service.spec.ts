import { Test, TestingModule } from '@nestjs/testing';
import { MedicineStockService } from './medicine-stock.service';

describe('MedicineStockService', () => {
  let service: MedicineStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicineStockService],
    }).compile();

    service = module.get<MedicineStockService>(MedicineStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
