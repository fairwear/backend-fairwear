import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleService } from '../user-role/user-role.service';
import { UserService } from '../user/user.service';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
  imports: [PrismaModule],
  controllers: [TopicController],
  providers: [
    TopicService,
    AuthService,
    UserService,
    UserRoleService,
    JwtService,
    PrismaService,
  ],
})
export class TopicModule {}
