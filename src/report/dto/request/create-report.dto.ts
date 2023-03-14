import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportStatusEnum } from '@prisma/client';
export class CreateReportRequest {
  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Number })
  authorId: number;

  @ApiProperty({ type: String })
  reportReason: string;

  @ApiPropertyOptional({ type: String })
  comment: string;

  @ApiProperty({ type: Number })
  itemId: number;

  @ApiProperty({ type: String })
  status: ReportStatusEnum;
}
