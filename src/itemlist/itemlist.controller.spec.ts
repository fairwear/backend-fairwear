import { Test, TestingModule } from '@nestjs/testing';
import { ItemlistController } from './itemlist.controller';
import { ItemlistService } from './itemlist.service';

describe('ItemlistController', () => {
  let controller: ItemlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemlistController],
      providers: [ItemlistService],
    }).compile();

    controller = module.get<ItemlistController>(ItemlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
