import { Test, TestingModule } from '@nestjs/testing';
import { InfopostController } from './infopost.controller';
import { InfopostService } from './infopost.service';

describe('InfopostController', () => {
  let controller: InfopostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfopostController],
      providers: [InfopostService],
    }).compile();

    controller = module.get<InfopostController>(InfopostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
