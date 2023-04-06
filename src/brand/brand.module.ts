import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { UserRoleService } from '../user-role/user-role.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BrandController],
  providers: [
    BrandService,
    AuthService,
    UserService,
    UserRoleService,
    JwtService,
    PrismaService,
  ],
})
export class BrandModule {}
