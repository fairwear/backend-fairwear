import { Test, TestingModule } from '@nestjs/testing';
import { InfoPostService } from './infopost.service';

describe('InfopostService', () => {
  let service: InfoPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoPostService],
    }).compile();

    service = module.get<InfoPostService>(InfoPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
