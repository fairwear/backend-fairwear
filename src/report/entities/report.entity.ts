import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReportEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: String })
  reportReason: string;

  @ApiPropertyOptional({ type: String })
  comment: string;

  @ApiProperty({ type: Array<number> })
  itemId: number;

  @ApiProperty({ type: Array<number> })
  authorId: number;
}
