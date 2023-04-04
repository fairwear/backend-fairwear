import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportStatusEnum } from '@prisma/client';

export class ReportResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Number })
  authorId: number;

  @ApiProperty({ type: String })
  reportReason: string;

  @ApiPropertyOptional({ type: String })
  comment: string | null;

  @ApiProperty({})
  status: ReportStatusEnum;
}