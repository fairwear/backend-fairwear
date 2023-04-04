import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportRequest } from './dto/request/create-report.dto';
import { UpdateReportRequest } from './dto/request/update-report.dto';
import { ReportMapper } from './mapper/report.mapper';

@Controller('api/v1/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async create(@Body() request: CreateReportRequest) {
    const entity = ReportMapper.toEntity(request);
    const report = await this.reportService.create(entity);
    return ReportMapper.toResponse(report);
  }

  @Get()
  async findAll() {
    const entities = await this.reportService.findAll();
    return ReportMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const entity = await this.reportService.findById(+id);
    if (!entity) return null;
    return ReportMapper.toResponse(entity);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: UpdateReportRequest) {
    const entity = ReportMapper.toEntity(request);
    const report = await this.reportService.update(+id, entity);
    return ReportMapper.toResponse(report);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedEntity = await this.reportService.delete(+id);
    return ReportMapper.toResponse(deletedEntity);
  }
}
