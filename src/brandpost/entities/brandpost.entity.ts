import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BrandPostToTopic,
  BrandPostVote,
  BrandPost,
  BrandPostToItem,
} from '@prisma/client';
import { BrandEntity } from '../../brand/entities/brand.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { BrandPostVoteEntity } from './brandpost-vote.entity';
import { ReportEntity } from '../../report/entities/report.entity';
import { BrandPostReferenceEntity } from './brandpost-reference.entity.ts';

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

  @ApiProperty({ type: Date, description: 'BrandPost Brand ID' })
  brandId: number;

  @ApiProperty({ type: Date, description: 'BrandPost Author ID' })
  authorId: number;

  @ApiProperty({ type: Number, description: 'BrandPost Score' })
  postScore: number;

  @ApiProperty({
    type: Array<BrandPostReferenceEntity>,
    description: 'BrandPost References',
  })
  references: BrandPostReferenceEntity[];

  @ApiProperty({ type: BrandEntity, description: 'Brand Entity' })
  brand: BrandEntity;

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
