import { Module } from '@nestjs/common';
import { ReportStatusService } from './report-status.service';
import { ReportStatusController } from './report-status.controller';

@Module({
  controllers: [ReportStatusController],
  providers: [ReportStatusService],
})
export class ReportStatusModule {}
