import { ApiProperty } from '@nestjs/swagger';
import { BrandPostToTopicEntryDto } from './entry/brandpost-to-topic-entry.dto';
import { BrandPostReferenceEntity } from '../../entities/brandpost-reference.entity.ts';

export class CreateBrandPostDto {
  @ApiProperty({ type: String, description: 'BrandPost Title' })
  title: string;

  @ApiProperty({ type: String, description: 'BrandPost Body' })
  body: string;

  @ApiProperty({
    type: BrandPostReferenceEntity,
    description: 'BrandPost References',
    isArray: true,
  })
  references: BrandPostReferenceEntity[];

  @ApiProperty({ type: Number, description: 'BrandPost Brand ID' })
  brandId: number;

  @ApiProperty({
    type: () => BrandPostToTopicEntryDto,
    description: 'BrandPost Topics',
    isArray: true,
  })
  topics: BrandPostToTopicEntryDto[];

  @ApiProperty({
    type: Number,
    description: 'BrandPost Related Items',
    isArray: true,
  })
  itemIds: number[];
}
