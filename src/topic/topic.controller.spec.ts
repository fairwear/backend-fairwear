import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

describe('TopicController', () => {
  let controller: TopicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [TopicService, PrismaService],
      controllers: [TopicController]
    }).compile();

    controller = module.get<TopicController>(TopicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
