import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ReportStatusService } from '../report-status/report-status.service';
import { ReportStatusModule } from '../report-status/report-status.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, UserModule, ReportStatusModule],
  controllers: [ReportController],
  providers: [ReportService, ReportStatusService, PrismaService],
})
export class ReportModule {}
