import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReportController],
  providers: [ReportService, PrismaService],
})
export class ReportModule {}
