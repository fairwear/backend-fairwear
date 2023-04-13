import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleModule } from '../user-role/user-role.module';
import { UserRoleService } from '../user-role/user-role.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, UserModule, UserRoleModule, ConfigModule],
  controllers: [ReportController],
  providers: [
    ReportService,
    AuthService,
    UserService,
    UserRoleService,
    JwtService,
    PrismaService,
  ],
})
export class ReportModule {}
