import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { EmailService } from '../email/email.service';

export type Context = {
  // Add services here
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
  emailService: DeepMockProxy<EmailService>;

  // Add more services here
};

export const createMockContext = (): MockContext => {
  return {
    // Also add services here
    prisma: mockDeep<PrismaClient>(),
    emailService: mockDeep<EmailService>(),
  };
};
