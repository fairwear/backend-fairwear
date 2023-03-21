import { Test, TestingModule } from '@nestjs/testing';
import { ItemlistService } from './itemlist.service';

describe('ItemlistService', () => {
  let service: ItemlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemlistService],
    }).compile();

    service = module.get<ItemlistService>(ItemlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
