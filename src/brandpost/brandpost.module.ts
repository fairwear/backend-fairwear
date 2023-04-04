import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleService } from '../user-role/user-role.service';
import { UserService } from '../user/user.service';
import { BrandPostController } from './brandpost.controller';
import { BrandPostService } from './brandpost.service';

@Module({
  imports: [ConfigModule],
  controllers: [BrandPostController],
  providers: [
    BrandPostService,
    AuthService,
    UserService,
    UserRoleService,
    JwtService,
    PrismaService,
  ],
})
export class BrandpostModule {}
