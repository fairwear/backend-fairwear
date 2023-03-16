import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportStatusEnum } from '@prisma/client';
export class ReportEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: String })
  reportReason: string;

  @ApiProperty({ type: Array<number> })
  authorId: number;

  @ApiPropertyOptional({ type: String })
  comment: string | null;

  @ApiProperty({ type: Array<number> })
  itemId: number;

  @ApiProperty({ type: ReportStatusEnum })
  status: ReportStatusEnum;
}
