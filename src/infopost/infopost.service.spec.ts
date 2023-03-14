import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { DataFactory } from '../../prisma/data/DataFactory';
import { MockContext, createMockContext } from '../prisma/context';
import { PrismaService } from '../prisma/prisma.service';
import { InfoPostService } from './infopost.service';

describe('InfopostService', () => {
  let service: InfoPostService;
  let mockContext: MockContext;
  let prismaService: DeepMockProxy<PrismaClient>;
  const dataFactory: DataFactory = new DataFactory();

  beforeEach(async () => {
    jest.resetAllMocks();
    mockContext = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [InfoPostService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockContext.prisma)
      .compile();

    service = module.get<InfoPostService>(InfoPostService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
