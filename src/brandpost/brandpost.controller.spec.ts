import { Test, TestingModule } from '@nestjs/testing';
import { BrandPostController as BrandPostController } from './brandpost.controller';
import { BrandPostService } from './brandpost.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { UserRoleService } from '../user-role/user-role.service';
import { JwtService } from '@nestjs/jwt';

describe('BrandpostController', () => {
  let controller: BrandPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandPostController],
      providers: [
        BrandPostService,
        AuthService,
        UserService,
        UserRoleService,
        JwtService,
        PrismaService,
      ],
    }).compile();

    controller = module.get<BrandPostController>(BrandPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
