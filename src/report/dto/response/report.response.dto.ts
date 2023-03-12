import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReportResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: String })
  reportReason: string;

  @ApiPropertyOptional({ type: String })
  comment: string | null;

  @ApiProperty({ type: Number })
  itemId: number;

  @ApiProperty({ type: Number })
  authorId: number;
}
