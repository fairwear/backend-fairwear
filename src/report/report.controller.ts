import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReportRequest } from './dto/request/create-report.dto';
import { UpdateReportRequest } from './dto/request/update-report.dto';
import { ReportMapper } from './mapper/report.mapper';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import GetCurrentUserId from '../auth/decorators/get-current-user-id.decorator';

@ApiTags('report')
@Controller('api/v1/report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() request: CreateReportRequest,
    @GetCurrentUserId() userId: number,
  ) {
    const entity = ReportMapper.toEntity(request, userId);
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
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() request: UpdateReportRequest,
  ) {
    const entity = ReportMapper.toAdminEntity(request, userId);
    const report = await this.reportService.update(+id, entity, userId);
    return ReportMapper.toResponse(report);
  }
}
