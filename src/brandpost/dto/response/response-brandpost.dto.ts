import { ApiProperty } from '@nestjs/swagger';
import { BrandPostToItem, BrandPostToTopic, VoteEnum } from '@prisma/client';
import { BrandResponse } from '../../../brand/dto/response/response-brand.dto';
import { BrandPostReferenceEntity } from '../../entities/brandpost-reference.entity.ts';

export class ResponseBrandPostDto {
  @ApiProperty({ type: Number, description: 'BrandPost ID' })
  id: number;

  @ApiProperty({ type: String, description: 'BrandPost Title' })
  title: string;

  @ApiProperty({ type: String, description: 'BrandPost Body' })
  body: string;

  @ApiProperty({ type: Number, description: 'BrandPost Score' })
  postScore: number;

  @ApiProperty({
    type: Array<BrandPostReferenceEntity>,
    description: 'BrandPost References',
  })
  references: BrandPostReferenceEntity[];

  @ApiProperty({ type: Date, description: 'BrandPost Creation Date' })
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'BrandPost Deletion Date' })
  deletedAt: Date | null;

  @ApiProperty({ type: BrandResponse, description: 'Brand' })
  brand: BrandResponse;

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
