import { Test, TestingModule } from '@nestjs/testing';
import { BrandPostController as BrandPostController } from './brandpost.controller';
import { BrandPostService } from './brandpost.service';

describe('BrandpostController', () => {
  let controller: BrandPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandPostController],
      providers: [BrandPostService],
    }).compile();

    controller = module.get<BrandPostController>(BrandPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
