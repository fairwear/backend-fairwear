import { ApiProperty } from '@nestjs/swagger';

export class BrandPostVoteResponseDto {
  @ApiProperty({ type: Number, description: 'Upvote count' })
  upvotes: number;

  @ApiProperty({ type: Number, description: 'Downvote count' })
  downvotes: number;
}
