import { PartialType } from '@nestjs/mapped-types';
import { CreateReportRequest } from './create-report.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportResultEnum, ReportStatusEnum } from '@prisma/client';

export class UpdateReportRequest extends PartialType(CreateReportRequest) {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  reportReason: string;

  @ApiPropertyOptional({ type: String })
  comment: string | null;

  @ApiProperty({})
  status: ReportStatusEnum;

  @ApiProperty({})
  reportResult: ReportResultEnum;

  @ApiPropertyOptional({ type: Date, required: true })
  resolvedAt: Date;
}
