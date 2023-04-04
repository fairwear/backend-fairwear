import { Test, TestingModule } from '@nestjs/testing';
import { BrandPostService as BrandPostService } from './brandpost.service';
import { MockContext, createMockContext } from '../prisma/context';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRoleService } from '../user-role/user-role.service';

describe('BrandpostService', () => {
  let service: BrandPostService;
  let mockContext: MockContext;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    jest.resetAllMocks();
    mockContext = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        BrandPostService,
        AuthService,
        UserService,
        JwtService,
        UserRoleService,
        PrismaService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockContext.prisma)
      .compile();

    service = module.get<BrandPostService>(BrandPostService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
