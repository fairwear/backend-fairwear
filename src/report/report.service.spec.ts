import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy } from 'jest-mock-extended';
import { createMockContext, MockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { ReportService } from './report.service';
import { DataFactory } from '../../prisma/data/DataFactory';

describe('ReportService', () => {
  let service: ReportService;
  let mockContext: MockContext;
  let prismaService: DeepMockProxy<PrismaClient>;
  const dataFactory: DataFactory = new DataFactory();

  beforeEach(async () => {
    jest.resetAllMocks();
    mockContext = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockContext.prisma)
      .compile();

    service = module.get<ReportService>(ReportService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should successfully create a report', async () => {
    const report = dataFactory.getValidReport();
    prismaService.report.create.mockResolvedValueOnce(report);
    const result = await service.create(report);
    expect(prismaService.report.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(report);
  });

  it('should fail to create a report', async () => {
    const report = dataFactory.getValidReport();
    prismaService.report.create.mockRejectedValueOnce(new Error('error'));
    await expect(service.create(report)).rejects.toThrowError('error');
    expect(prismaService.report.create).toHaveBeenCalledTimes(1);
  });

  it('should successfully find all reports', async () => {
    const report = dataFactory.getValidReport();
    prismaService.report.findMany.mockResolvedValueOnce([report]);
    const result = await service.findAll();
    expect(prismaService.report.findMany).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual([report]);
  });

  it('should fail to find all reports', async () => {
    prismaService.report.findMany.mockRejectedValueOnce(new Error('error'));
    await expect(service.findAll()).rejects.toThrowError('error');
    expect(prismaService.report.findMany).toHaveBeenCalledTimes(1);
  });

  it('should successfully find a report by id', async () => {
    const report = dataFactory.getValidReport();
    prismaService.report.findUniqueOrThrow.mockResolvedValueOnce(report);
    const result = await service.findById(report.id);
    expect(prismaService.report.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(report);
  });

  it('should fail to find a report by id', async () => {
    const report = dataFactory.getValidReport();
    prismaService.report.findUniqueOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.findById(report.id)).rejects.toThrowError('error');
    expect(prismaService.report.findUniqueOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should successfully update a report', async () => {
    const report = dataFactory.getValidReport();
    prismaService.report.update.mockResolvedValueOnce(report);
    const result = await service.update(report.id, report);
    expect(prismaService.report.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(report);
  });

  it('should fail to update a report', async () => {
    const report = dataFactory.getValidReport();
    prismaService.report.update.mockRejectedValueOnce(new Error('error'));
    await expect(service.update(report.id, report)).rejects.toThrowError(
      'error',
    );
    expect(prismaService.report.update).toHaveBeenCalledTimes(1);
  });
});
