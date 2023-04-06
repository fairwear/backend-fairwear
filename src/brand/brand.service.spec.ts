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
import { BrandService } from './brand.service';

describe('BrandService', () => {
  let service: BrandService;
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
        BrandService,
        AuthService,
        UserService,
        UserRoleService,
        JwtService,
        PrismaService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockContext.prisma)
      .overrideProvider(AuthService)
      .useValue(mockContext.authService)
      .compile();

    service = module.get<BrandService>(BrandService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
    authService = module.get<DeepMockProxy<AuthService>>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should successfuly create a brand', async () => {
    const brand = dataFactory.getValidBrand();
    prismaService.brand.create.mockResolvedValueOnce(brand);
    const result = await service.create(brand);
    expect(prismaService.brand.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(brand);
  });

  it('should fail to create a brand', async () => {
    const brand = dataFactory.getValidBrand();
    prismaService.brand.create.mockRejectedValueOnce(new Error('error'));
    await expect(service.create(brand)).rejects.toThrowError('error');
    expect(prismaService.brand.create).toHaveBeenCalledTimes(1);
  });

  it('should successfuly find all brands', async () => {
    const brand = dataFactory.getValidBrand();
    prismaService.brand.findMany.mockResolvedValueOnce([brand]);
    const result = await service.findAll();
    expect(prismaService.brand.findMany).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual([brand]);
  });

  it('should fail to find all brands', async () => {
    prismaService.brand.findMany.mockRejectedValueOnce(new Error('error'));
    await expect(service.findAll()).rejects.toThrowError('error');
    expect(prismaService.brand.findMany).toHaveBeenCalledTimes(1);
  });

  it('should successfuly find a brand by id', async () => {
    const brand = dataFactory.getValidBrand();
    prismaService.brand.findUniqueOrThrow.mockResolvedValueOnce(brand);
    const result = await service.findById(brand.id);
    expect(prismaService.brand.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(brand);
  });

  it('should fail to find a brand by id', async () => {
    prismaService.brand.findUniqueOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.findById(1)).rejects.toThrowError('error');
    expect(prismaService.brand.findUniqueOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should successfuly find a brand by name', async () => {
    const brand = dataFactory.getValidBrand();
    prismaService.brand.findUniqueOrThrow.mockResolvedValueOnce(brand);
    const result = await service.findByName(brand.name);
    expect(prismaService.brand.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(brand);
  });

  it('should fail to find a brand by name', async () => {
    prismaService.brand.findUniqueOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.findByName('name')).rejects.toThrowError('error');
    expect(prismaService.brand.findUniqueOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should successfuly update a brand', async () => {
    const brand = dataFactory.getValidBrand();
    prismaService.brand.update.mockResolvedValueOnce(brand);
    authService.isUserAdmin.mockResolvedValueOnce(true);
    const result = await service.update(1, brand);
    expect(prismaService.brand.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(brand);
  });

  it('should fail to update a brand', async () => {
    const brand = dataFactory.getValidBrand();
    prismaService.brand.update.mockRejectedValueOnce(new Error('error'));
    authService.isUserAdmin.mockResolvedValueOnce(true);
    await expect(service.update(1, brand)).rejects.toThrowError('error');
    expect(prismaService.brand.update).toHaveBeenCalledTimes(1);
  });

  it('should successfuly delete a brand', async () => {
    const brand = dataFactory.getValidBrand();

    prismaService.brand.update.mockResolvedValue(brand);
    authService.isUserAdmin.mockResolvedValueOnce(true);

    const result = await service.softDelete(1, 1);

    expect(prismaService.brand.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(brand);
  });

  it('should fail to delete a brand', async () => {
    prismaService.brand.update.mockRejectedValueOnce(new Error('error'));
    authService.isUserAdmin.mockResolvedValueOnce(true);

    await expect(service.softDelete(1, 1)).rejects.toThrowError('error');
    expect(prismaService.brand.update).toHaveBeenCalledTimes(1);
  });
});
