import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { UserRoleService } from '../user-role/user-role.service';
import { JwtService } from '@nestjs/jwt';

export type Context = {
  prisma: PrismaClient;
  authService: AuthService;
  userService: UserService;
  userRoleService: UserRoleService;
  jwtService: JwtService;

  // Add more services here
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
  authService: DeepMockProxy<AuthService>;
  userService: DeepMockProxy<UserService>;
  userRoleService: DeepMockProxy<UserRoleService>;
  jwtService: DeepMockProxy<JwtService>;

  // Add more services here
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
    authService: mockDeep<AuthService>(),
    userService: mockDeep<UserService>(),
    userRoleService: mockDeep<UserRoleService>(),
    jwtService: mockDeep<JwtService>(),

    // Add more services here
  };
};
