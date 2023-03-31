import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { DataFactory } from '../../prisma/data/DataFactory';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { EmailTemplateService } from './emailtemplate.service';
//TODO: Add tests for emailtemplate.service.ts

//TODO: Paziuret ar cia isvis logiska testuoti, nes prisma clientas yra mockintas
// ir nera galimybes testuoti ar prisma clientas veikia teisingai

//TODO: Paziuret ar nereikia test db
describe('EmailtemplateService', () => {
  let service: EmailTemplateService;
  let mockContext: MockContext;
  let prismaService: DeepMockProxy<PrismaClient>;
  const dataFactory: DataFactory = new DataFactory();

  beforeEach(async () => {
    jest.resetAllMocks();
    mockContext = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [EmailTemplateService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockContext.prisma)
      .compile();

    service = module.get<EmailTemplateService>(EmailTemplateService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should successfully create an email template', async () => {
    const emailTemplate = dataFactory.getValidEmailTemplate();

    prismaService.emailTemplate.create.mockResolvedValueOnce(emailTemplate);
    const result = await service.create(emailTemplate);
    expect(prismaService.emailTemplate.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(emailTemplate);
  });

  it('should fail to create an email template', async () => {
    const emailTemplate = dataFactory.getValidEmailTemplate();
    prismaService.emailTemplate.create.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.create(emailTemplate)).rejects.toThrowError('error');
    expect(prismaService.emailTemplate.create).toHaveBeenCalledTimes(1);
  });

  it('should successfully find all email templates', async () => {
    const emailTemplate = dataFactory.getValidEmailTemplate();
    prismaService.emailTemplate.findMany.mockResolvedValueOnce([emailTemplate]);
    const result = await service.findAll();
    expect(prismaService.emailTemplate.findMany).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual([emailTemplate]);
  });

  it('should fail to find all email templates', async () => {
    prismaService.emailTemplate.findMany.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.findAll()).rejects.toThrowError('error');
    expect(prismaService.emailTemplate.findMany).toHaveBeenCalledTimes(1);
  });

  it('should successfully find an email template by id', async () => {
    const emailTemplate = dataFactory.getValidEmailTemplate();
    prismaService.emailTemplate.findUniqueOrThrow.mockResolvedValueOnce(
      emailTemplate,
    );
    const result = await service.findById(1);
    expect(prismaService.emailTemplate.findUniqueOrThrow).toHaveBeenCalledTimes(
      1,
    );
    expect(result).toBeDefined();
    expect(result).toEqual(emailTemplate);
  });

  it('should fail to find an email template by id', async () => {
    prismaService.emailTemplate.findUniqueOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.findById(1)).rejects.toThrowError('error');
    expect(prismaService.emailTemplate.findUniqueOrThrow).toHaveBeenCalledTimes(
      1,
    );
  });

  it('should successfully update an email template', async () => {
    const emailTemplate = dataFactory.getValidEmailTemplate();
    prismaService.emailTemplate.update.mockResolvedValueOnce(emailTemplate);
    const result = await service.update(1, emailTemplate);
    expect(prismaService.emailTemplate.update).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(emailTemplate);
  });

  it('should fail to update an email template', async () => {
    const emailTemplate = dataFactory.getValidEmailTemplate();
    prismaService.emailTemplate.update.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.update(1, emailTemplate)).rejects.toThrowError(
      'error',
    );
    expect(prismaService.emailTemplate.update).toHaveBeenCalledTimes(1);
  });

  it('should successfully delete an email template', async () => {
    const emailTemplate = dataFactory.getValidEmailTemplate();
    prismaService.emailTemplate.delete.mockResolvedValueOnce(emailTemplate);
    const result = await service.delete(1);
    expect(prismaService.emailTemplate.delete).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(emailTemplate);
  });

  it('should fail to delete an email template', async () => {
    prismaService.emailTemplate.delete.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.delete(1)).rejects.toThrowError('error');
    expect(prismaService.emailTemplate.delete).toHaveBeenCalledTimes(1);
  });
});
