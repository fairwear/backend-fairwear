import { Controller, Get, Param } from '@nestjs/common';
import { ReportStatusService } from './report-status.service';
import { ReportStatusEnum } from '@prisma/client';

@Controller('report-status')
export class ReportStatusController {
  // constructor(private readonly reportStatusService: ReportStatusService) {}
  // @Get()
  // async findAll() {
  //   return await this.reportStatusService.findAll();
  // }
  // @Get(':id')
  // async findById(@Param('id') id: number) {
  //   return await this.reportStatusService.findById(id);
  // }
  // @Get(':/status')
  // async findByStatus(@Param('status') status: ReportStatusEnum) {
  //   return await this.reportStatusService.findByStatus(status);
  // }
  // @Get(':/name')
  // async findByName(@Param('name') name: string) {
  //   return await this.reportStatusService.findByName(name);
  // }
}
