import { Test, TestingModule } from '@nestjs/testing';
import { BrandpostService } from './brandpost.service';

describe('BrandpostService', () => {
  let service: BrandpostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandpostService],
    }).compile();

    service = module.get<BrandpostService>(BrandpostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
