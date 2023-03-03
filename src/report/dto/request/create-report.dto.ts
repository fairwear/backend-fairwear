import { ApiProperty } from '@nestjs/swagger';
export class CreateReportRequest {
  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Number })
  authorId: number;

  @ApiProperty({ type: String })
  reportReason: string;

  @ApiProperty({ type: Number })
  itemId: number;
}
