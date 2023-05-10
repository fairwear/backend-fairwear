import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UserService } from '../user/user.service';
import { BrandPostService } from '../brandpost/brandpost.service';
import { AuthService } from '../auth/auth.service';
import { UserRoleService } from '../user-role/user-role.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    TasksService,
    UserService,
    BrandPostService,
    AuthService,
    JwtService,
    UserRoleService,
    PrismaService,
  ],
})
export class TasksModule {}
