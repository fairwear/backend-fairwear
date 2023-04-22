import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { DataFactory } from '../../prisma/data/DataFactory';
import { AuthService } from '../auth/auth.service';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleService } from '../user-role/user-role.service';
import { UserService } from '../user/user.service';
import { TopicService } from './topic.service';

describe('TopicService', () => {
  let service: TopicService;
  let mockContext: MockContext;
  let prismaService: DeepMockProxy<PrismaClient>;
  let authService: DeepMockProxy<AuthService>;
  const dataFactory: DataFactory = new DataFactory();

  beforeEach(async () => {
    jest.resetAllMocks();
    mockContext = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        TopicService,
        AuthService,
        UserService,
        UserRoleService,
        JwtService,
        PrismaService,
      ],
    })
      .overrideProvider(AuthService)
      .useValue(mockContext.authService)
      .overrideProvider(PrismaService)
      .useValue(mockContext.prisma)
      .compile();

    service = module.get<TopicService>(TopicService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
    authService = module.get<DeepMockProxy<AuthService>>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should successfuly create a topic', async () => {
    const topic = dataFactory.getValidTopic();

    prismaService.topic.create.mockResolvedValueOnce(topic);
    authService.isUserAdmin.mockResolvedValueOnce(true);
    const result = await service.create(topic, 1);
    expect(prismaService.topic.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(topic);
  });

  it('should fail to create a topic', async () => {
    const topic = dataFactory.getValidTopic();
    prismaService.topic.create.mockRejectedValueOnce(new Error('error'));
    authService.isUserAdmin.mockResolvedValueOnce(false);
    await expect(service.create(topic, 1)).rejects.toThrowError('error');
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
    prismaService.topic.findUniqueOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.findById(1)).rejects.toThrowError('error');
    expect(prismaService.topic.findUniqueOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should successfuly update a topic', async () => {
    const topic = dataFactory.getValidTopic();
    prismaService.topic.update.mockResolvedValueOnce(topic);
    authService.isUserAdmin.mockResolvedValueOnce(true);
    const result = await service.update(1, topic, 1);
    expect(prismaService.topic.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(topic);
  });
});
