import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy } from 'jest-mock-extended';
import { createMockContext, MockContext } from '../prisma/context';
import { TopicService } from './topic.service';
import { PrismaClient } from '@prisma/client';
import { DataFactory } from 'prisma/data/DataFactory';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TopicService', () => {
  let service: TopicService;
  let mockContext: MockContext;
  let prismaService: DeepMockProxy<PrismaClient>;
  const dataFactory: DataFactory = new DataFactory();

  beforeEach(async () => {
    jest.resetAllMocks();
    mockContext = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [TopicService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockContext.prisma)
      .compile();

    service = module.get<TopicService>(TopicService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should successfuly create a topic', async () => {
    const topic = dataFactory.getValidTopic();

    prismaService.topic.create.mockResolvedValueOnce(topic);
    const result = await service.create(topic);
    expect(prismaService.topic.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(topic);
  });

  it('should fail to create a topic', async () => {
    const topic = dataFactory.getValidTopic();
    prismaService.topic.create.mockRejectedValueOnce(new Error('error'));
    await expect(service.create(topic)).rejects.toThrowError('error');
    expect(prismaService.topic.create).toHaveBeenCalledTimes(1);
  });

  it('should successfuly find all topics', async () => {
    const topic = dataFactory.getValidTopic();
    prismaService.topic.findMany.mockResolvedValueOnce([topic]);
    const result = await service.findAll();
    expect(prismaService.topic.findMany).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual([topic]);
  });

  it('should fail to find all topics', async () => {
    prismaService.topic.findMany.mockRejectedValueOnce(new Error('error'));
    await expect(service.findAll()).rejects.toThrowError('error');
    expect(prismaService.topic.findMany).toHaveBeenCalledTimes(1);
  });

  it('should successfuly find a topic by id', async () => {
    const topic = dataFactory.getValidTopic();
    prismaService.topic.findUniqueOrThrow.mockResolvedValueOnce(topic);
    const result = await service.findById(topic.id);
    expect(prismaService.topic.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(topic);
  });

  it('should fail to find a topic by id', async () => {
    prismaService.topic.findUniqueOrThrow.mockRejectedValueOnce(new Error('error'));
    await expect(service.findById(1)).rejects.toThrowError('error');
    expect(prismaService.topic.findUniqueOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should successfuly update a topic', async () => {
    const topic = dataFactory.getValidTopic();
    prismaService.topic.update.mockResolvedValueOnce(topic);
    const result = await service.update(1, topic);
    expect(prismaService.topic.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(topic);
  });
});
