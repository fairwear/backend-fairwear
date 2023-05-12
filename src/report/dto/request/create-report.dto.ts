import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportStatusEnum } from '@prisma/client';

export class CreateReportRequest {
  @ApiProperty({ type: String, description: 'The reason for the report' })
  reportReason: string;

  @ApiProperty({
    description: 'The status of the report',
  })
  status: ReportStatusEnum;

  @ApiPropertyOptional({
    type: String,
    description: 'Additional comment about the report',
    nullable: true,
    required: false,
  })
  comment: string | null;

  @ApiProperty({
    type: Number,
    description: 'The id of the user who created the report',
  })
  postId: number;

  @ApiProperty({ type: Date, description: 'The date the report was created' })
  createdAt: Date;
}
