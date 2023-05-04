import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportStatusEnum } from '@prisma/client';
import { UserEntity } from '../../user/entities/user.entity';
export class ReportEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  reportReason: string;

  @ApiProperty({})
  status: ReportStatusEnum;

  @ApiPropertyOptional({ type: String })
  comment: string | null;

  @ApiProperty({ type: Number })
  authorId: number;

  @ApiProperty({ type: UserEntity })
  author: UserEntity;

  @ApiProperty({ type: Number })
  postId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date, nullable: true, required: false })
  resolvedAt: Date | null;

  @ApiPropertyOptional({ type: Number, nullable: true, required: false })
  resolvedById: number | null;
}
