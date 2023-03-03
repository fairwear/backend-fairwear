import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReportEntity {
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

  @ApiProperty({ type: Number })
  itemId: number;
}
