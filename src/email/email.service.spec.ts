import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MockContext, createMockContext } from '../prisma/context';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

describe('EmailService', () => {
  let service: EmailService;
  let mockContext: MockContext;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    jest.resetAllMocks();
    mockContext = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [EmailService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockContext.prisma)
      .compile();

    service = module.get<EmailService>(EmailService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
