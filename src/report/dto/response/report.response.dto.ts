import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BrandPost, ReportResultEnum, ReportStatusEnum } from '@prisma/client';
import UserInfoResponse from '../../../user/dto/response/user-info.response.dto';

export class ReportResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  reportReason: string;

  @ApiPropertyOptional({ type: String })
  comment: string | null;

  @ApiProperty({})
  status: ReportStatusEnum;

  @ApiProperty({})
  reportResult: ReportResultEnum;

  @ApiProperty({ type: () => UserInfoResponse })
  author: UserInfoResponse;

  @ApiProperty({})
  post: BrandPost;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date, nullable: true, required: false })
  resolvedAt: Date | null;
}
