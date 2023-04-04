import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserRoleModule } from '../user-role/user-role.module';
import { UserRoleService } from '../user-role/user-role.service';

@Module({
  imports: [PrismaModule, UserModule, UserRoleModule],
  controllers: [ReportController],
  providers: [ReportService, UserService, UserRoleService, PrismaService],
})
export class ReportModule {}
