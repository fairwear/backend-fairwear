import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleService } from '../user-role/user-role.service';
import { UserService } from '../user/user.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  controllers: [ItemController],
  providers: [
    ItemService,
    AuthService,
    UserService,
    UserRoleService,
    JwtService,
    PrismaService,
  ],
})
export class ItemModule {}
