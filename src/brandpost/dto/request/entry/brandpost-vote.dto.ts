import { ApiProperty } from '@nestjs/swagger';
import { VoteEnum } from '@prisma/client';

export class VoteBrandPostDto {
  @ApiProperty({ type: Number, description: 'BrandPost ID' })
  postId: number;

  @ApiProperty({ type: typeof VoteEnum, description: 'Vote Type' })
  vote: VoteEnum;
}
