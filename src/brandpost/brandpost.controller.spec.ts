import { Test, TestingModule } from '@nestjs/testing';
import { BrandpostController } from './brandpost.controller';
import { BrandpostService } from './brandpost.service';

describe('BrandpostController', () => {
  let controller: BrandpostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandpostController],
      providers: [BrandpostService],
    }).compile();

    controller = module.get<BrandpostController>(BrandpostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
