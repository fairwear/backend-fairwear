import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { JwtService } from '@nestjs/jwt';
import { UserRoleService } from '../user-role/user-role.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

describe('TopicController', () => {
  let controller: TopicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        TopicService,
        AuthService,
        UserService,
        UserRoleService,
        JwtService,
        PrismaService,
      ],
      controllers: [TopicController],
    }).compile();

    controller = module.get<TopicController>(TopicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
