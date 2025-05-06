import { Test, TestingModule } from '@nestjs/testing';
import { PatientDocumentController } from './patient-document.controller';
import { PatientDocumentService } from './patient-document.service';

describe('PatientDocumentController', () => {
  let controller: PatientDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientDocumentController],
      providers: [PatientDocumentService],
    }).compile();

    controller = module.get<PatientDocumentController>(PatientDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
