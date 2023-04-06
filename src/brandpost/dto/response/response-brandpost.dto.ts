import { ApiProperty } from '@nestjs/swagger';
import { BrandPostToItem, BrandPostToTopic, VoteEnum } from '@prisma/client';

export class ResponseBrandPostDto {
  @ApiProperty({ type: Number, description: 'BrandPost ID' })
  id: number;

  @ApiProperty({ type: String, description: 'BrandPost Body' })
  body: string;

  @ApiProperty({ type: Date, description: 'BrandPost Creation Date' })
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'BrandPost Deletion Date' })
  deletedAt: Date | null;

  @ApiProperty({ type: () => Array<VoteEnum>, description: 'BrandPost Votes' })
  votes: VoteEnum[];

  @ApiProperty({
    type: Array<BrandPostToTopic>,
    description: 'BrandPost Topics',
  })
  topics: BrandPostToTopic[];

  @ApiProperty({
    type: Array<BrandPostToItem>,
    description: 'BrandPost Related Items',
  })
  relatedItems: BrandPostToItem[];
}
