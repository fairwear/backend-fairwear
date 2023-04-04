import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportStatus } from './report-status.enum';
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

  @ApiProperty({})
  status: ReportStatus;
}
