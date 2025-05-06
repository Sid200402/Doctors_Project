import { Test, TestingModule } from '@nestjs/testing';
import { PatientDocumentService } from './patient-document.service';

describe('PatientDocumentService', () => {
  let service: PatientDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientDocumentService],
    }).compile();

    service = module.get<PatientDocumentService>(PatientDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
