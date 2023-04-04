import { Test, TestingModule } from '@nestjs/testing';
import { BrandPostService as BrandPostService } from './brandpost.service';

describe('BrandpostService', () => {
  let service: BrandPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandPostService],
    }).compile();

    service = module.get<BrandPostService>(BrandPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
