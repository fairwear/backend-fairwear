import { Test, TestingModule } from '@nestjs/testing';
import { InfoPostController } from './infopost.controller';
import { InfoPostService } from './infopost.service';

describe('InfopostController', () => {
  let controller: InfoPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfoPostController],
      providers: [InfoPostService],
    }).compile();

    controller = module.get<InfoPostController>(InfoPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
