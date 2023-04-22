import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { JwtService } from '@nestjs/jwt';
import { UserRoleService } from '../user-role/user-role.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

describe('ItemController', () => {
  let controller: ItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      imports: [ConfigModule],
      providers: [
        ItemService,
        AuthService,
        UserService,
        UserRoleService,
        JwtService,
        PrismaService,
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
