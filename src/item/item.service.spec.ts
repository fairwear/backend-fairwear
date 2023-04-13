import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { DataFactory } from '../../prisma/data/DataFactory';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { ItemService } from './item.service';
import { JwtService } from '@nestjs/jwt';
import { UserRoleService } from '../user-role/user-role.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

describe('ItemService', () => {
  let service: ItemService;
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
        ItemService,
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

    service = module.get<ItemService>(ItemService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
    authService = module.get<DeepMockProxy<AuthService>>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should successfuly create an item', async () => {
    const item = dataFactory.getValidItem();

    prismaService.item.create.mockResolvedValueOnce(item);
    const result = await service.create(item);
    expect(prismaService.item.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(item);
  });

  it('should fail to create an item', async () => {
    const item = dataFactory.getValidItem();
    prismaService.item.create.mockRejectedValueOnce(new Error('error'));
    await expect(service.create(item)).rejects.toThrowError('error');
    expect(prismaService.item.create).toHaveBeenCalledTimes(1);
  });

  it('should successfuly find all items', async () => {
    const item = dataFactory.getValidItem();
    prismaService.item.findMany.mockResolvedValueOnce([item]);
    const result = await service.findAll();
    expect(prismaService.item.findMany).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual([item]);
  });

  it('should fail to find all items', async () => {
    prismaService.item.findMany.mockRejectedValueOnce(new Error('error'));
    await expect(service.findAll()).rejects.toThrowError('error');
    expect(prismaService.item.findMany).toHaveBeenCalledTimes(1);
  });

  it('should successfuly find one item by id', async () => {
    const item = dataFactory.getValidItem();
    prismaService.item.findUniqueOrThrow.mockResolvedValueOnce(item);
    const result = await service.findById(item.id);
    expect(prismaService.item.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(item);
  });

  it('should fail to find one item by id', async () => {
    prismaService.item.findUniqueOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.findById(1)).rejects.toThrowError('error');
    expect(prismaService.item.findUniqueOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should successfuly find one item by name', async () => {
    const item = dataFactory.getValidItem();
    prismaService.item.findUniqueOrThrow.mockResolvedValueOnce(item);
    const result = await service.findByName(item.name);
    expect(prismaService.item.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(item);
  });

  it('should fail to find one item by name', async () => {
    prismaService.item.findUniqueOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.findByName('name')).rejects.toThrowError('error');
    expect(prismaService.item.findUniqueOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should successfuly update an item', async () => {
    const item = dataFactory.getValidItem();
    prismaService.item.update.mockResolvedValueOnce(item);
    prismaService.item.findUniqueOrThrow.mockResolvedValueOnce(item);
    const result = await service.update(1, item);
    expect(prismaService.item.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(item);
  });

  it('should fail to update an item', async () => {
    const item = dataFactory.getValidItem();
    prismaService.item.update.mockRejectedValueOnce(new Error('error'));
    prismaService.item.findUniqueOrThrow.mockResolvedValueOnce(item);
    await expect(service.update(1, item)).rejects.toThrowError('error');
    expect(prismaService.item.update).toHaveBeenCalledTimes(1);
  });

  it('should successfuly delete an item', async () => {
    const item = dataFactory.getValidItem();
    prismaService.item.update.mockResolvedValueOnce(item);
    authService.isUserAdmin.mockResolvedValueOnce(true);
    const result = await service.softDelete(1, 1);
    expect(prismaService.item.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(item);
  });

  it('should fail to delete an item', async () => {
    prismaService.item.update.mockRejectedValueOnce(new Error('error'));
    authService.isUserAdmin.mockResolvedValueOnce(true);
    await expect(service.softDelete(1, 1)).rejects.toThrowError('error');
    expect(prismaService.item.update).toHaveBeenCalledTimes(1);
  });
});
