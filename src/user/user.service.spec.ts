import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { DataFactory } from '../../prisma/data/DataFactory';
import { createMockContext, MockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleService } from '../user-role/user-role.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockContext: MockContext;
  let prismaService: DeepMockProxy<PrismaClient>;
  const dataFactory: DataFactory = new DataFactory();

  beforeEach(async () => {
    jest.resetAllMocks();
    mockContext = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [UserService, UserRoleService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockContext.prisma)
      .compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should successfully create a user', async () => {
    const user = dataFactory.getValidUser();
    prismaService.user.create.mockResolvedValueOnce(user);
    const result = await service.create(user);
    expect(prismaService.user.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(user);
  });

  it('should fail to create a user', async () => {
    const user = dataFactory.getValidUser();
    prismaService.user.create.mockRejectedValueOnce(new Error('error'));
    await expect(service.create(user)).rejects.toThrowError('error');
    expect(prismaService.user.create).toHaveBeenCalledTimes(1);
  });

  it('should successfully find all users', async () => {
    const user = dataFactory.getValidUser();
    prismaService.user.findMany.mockResolvedValueOnce([user]);
    const result = await service.findAll();
    expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual([user]);
  });

  it('should fail to find all users', async () => {
    prismaService.user.findMany.mockRejectedValueOnce(new Error('error'));
    await expect(service.findAll()).rejects.toThrowError('error');
    expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
  });

  it('should successfully find a user by id', async () => {
    const user = dataFactory.getValidUser();
    prismaService.user.findUniqueOrThrow.mockResolvedValueOnce(user);
    const result = await service.findById(user.id);
    expect(prismaService.user.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(user);
  });

  it('should fail to find a user by id', async () => {
    prismaService.user.findUnique.mockRejectedValueOnce(new Error('error'));
    await expect(service.findById(1)).rejects.toThrowError(
      'User with id 1 not found',
    );
    expect(prismaService.user.findUniqueOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should successfully find a user by username', async () => {
    const user = dataFactory.getValidUser();
    prismaService.user.findFirstOrThrow.mockResolvedValueOnce(user);
    const result = await service.findByUsername(user.username);
    expect(prismaService.user.findFirstOrThrow).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(user);
  });

  it('should fail to find a user by username', async () => {
    prismaService.user.findFirstOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(
      service.findByUsername('Test username 1'),
    ).rejects.toThrowError('error');
    expect(prismaService.user.findFirstOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should successfully find a user by email', async () => {
    const user = dataFactory.getValidUser();
    prismaService.user.findFirstOrThrow.mockResolvedValueOnce(user);
    const result = await service.findByEmail(user.email);
    expect(prismaService.user.findFirstOrThrow).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(user);
  });

  it('should fail to find a user by email', async () => {
    prismaService.user.findFirstOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.findByEmail('Test email 1')).rejects.toThrowError(
      'error',
    );
    expect(prismaService.user.findFirstOrThrow).toHaveBeenCalledTimes(1);
  });
  it('should successfully update a user', async () => {
    const user = dataFactory.getValidUser();
    prismaService.user.update.mockResolvedValueOnce(user);
    const result = await service.update(user.id, user);
    expect(prismaService.user.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(user);
  });

  it('should fail to update a user', async () => {
    const user = dataFactory.getValidUser();
    prismaService.user.update.mockRejectedValueOnce(new Error('error'));
    await expect(service.update(1, user)).rejects.toThrowError('error');
    expect(prismaService.user.update).toHaveBeenCalledTimes(1);
  });

  it('should successfully delete a user', async () => {
    const user = dataFactory.getValidUser();
    prismaService.user.delete.mockResolvedValueOnce(user);
    const result = await service.delete(user.id);
    expect(prismaService.user.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(user);
  });
  it('should fail to delete a user', async () => {
    prismaService.user.delete.mockRejectedValueOnce(new Error('error'));
    await expect(service.delete(1)).rejects.toThrowError('error');
    expect(prismaService.user.delete).toHaveBeenCalledTimes(1);
  });
});
