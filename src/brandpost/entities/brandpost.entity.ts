import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Brand,
  BrandPost,
  BrandPostToItem,
  BrandPostToTopic,
  BrandPostVote,
} from '@prisma/client';
import { BrandEntity } from '../../brand/entities/brand.entity';
import { ReportEntity } from '../../report/entities/report.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { BrandPostVoteEntity } from './brandpost-vote.entity';

export class BrandPostEntity {
  @ApiProperty({ type: Number, description: 'BrandPost ID' })
  id: number;

  @ApiProperty({ type: String, description: 'BrandPost Title' })
  title: string;

  @ApiProperty({ type: String, description: 'BrandPost Body' })
  body: string;

  @ApiProperty({ type: Date, description: 'BrandPost Creation Date' })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date, description: 'BrandPost Deletion Date' })
  deletedAt: Date | null;

  @ApiProperty({ type: Number, description: 'BrandPost Brand ID' })
  brandId: number;

  @ApiProperty({ type: Date, description: 'BrandPost Author ID' })
  authorId: number;

  @ApiProperty({ type: Number, description: 'BrandPost Score' })
  postScore: number;

  @ApiProperty({
    type: Array<string>,
    description: 'BrandPost Reference source urls',
  })
  sourceUrls: string[];

  @ApiProperty({ type: BrandEntity, description: 'Brand Entity' })
  brand: BrandEntity | Brand;

  @ApiProperty({
    type: () => Array<ReportEntity>,
    description: 'BrandPost Reports',
  })
  reports: ReportEntity[];

  @ApiProperty({})
  author: UserEntity;

  @ApiProperty({
    type: () => Array<BrandPostVote>,
    description: 'BrandPost Votes',
  })
  votes: BrandPostVoteEntity[];

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
