import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

export type Context = {
  // Add services here
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;

  // Add more services here
};

export const createMockContext = (): MockContext => {
  return {
    // Also add services here
    prisma: mockDeep<PrismaClient>(),
  };
};
