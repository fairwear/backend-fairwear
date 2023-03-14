import { Test, TestingModule } from '@nestjs/testing';
import { InfoPostController } from './infopost.controller';
import { InfoPostService } from './infopost.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

describe('InfopostController', () => {
  let controller: InfoPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [InfoPostController],
      providers: [InfoPostService, PrismaService],
    }).compile();

    controller = module.get<InfoPostController>(InfoPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
