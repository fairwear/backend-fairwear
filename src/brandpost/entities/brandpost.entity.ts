import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BrandPostToTopic,
  BrandPostVote,
  BrandPost,
  BrandPostToItem,
} from '@prisma/client';

export class BrandPostEntity {
  @ApiProperty({ type: Number, description: 'BrandPost ID' })
  id: number;

  @ApiProperty({ type: String, description: 'BrandPost Body' })
  body: string;

  @ApiProperty({ type: Date, description: 'BrandPost Creation Date' })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date, description: 'BrandPost Deletion Date' })
  deletedAt: Date | null;

  @ApiProperty({ type: Date, description: 'BrandPost Brand ID' })
  brandId: number;

  @ApiProperty({ type: Date, description: 'BrandPost Author ID' })
  authorId: number;

  @ApiProperty({
    type: () => Array<BrandPostVote>,
    description: 'BrandPost Votes',
  })
  votes: BrandPostVote[];

  @ApiProperty({
    type: Array<BrandPostToTopic>,
    description: 'BrandPost Topics',
  })
  topics: BrandPostToTopic[];

  @ApiProperty({
    type: Array<BrandPost>,
    description: 'BrandPost Related Items',
  })
  relatedItems: BrandPostToItem[];
}
