import { Test, TestingModule } from '@nestjs/testing';
import { InfopostService } from './infopost.service';

describe('InfopostService', () => {
  let service: InfopostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfopostService],
    }).compile();

    service = module.get<InfopostService>(InfopostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
