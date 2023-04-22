import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleService } from '../user-role/user-role.service';
import { UserRoleModule } from '../user-role/user-role.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [PrismaModule, UserRoleModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRoleService,
    AuthService,
    JwtService,
    PrismaService,
  ],
})
export class UserModule {}
