import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRoleService } from 'src/user-role/user-role.service';
@Module({
  imports: [PrismaModule, UserRoleService],
  controllers: [UserController],
  providers: [UserService, UserRoleService, PrismaService],
})
export class UserModule {}
