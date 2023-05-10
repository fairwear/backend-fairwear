import { ApiProperty } from '@nestjs/swagger';
import { BrandPostToTopicEntryDto } from './entry/brandpost-to-topic-entry.dto';
import { BrandPostReferenceEntity } from '../../entities/brandpost-reference.entity.ts';

export class CreateBrandPostDto {
  @ApiProperty({ type: String, description: 'BrandPost Title' })
  title: string;

  @ApiProperty({ type: String, description: 'BrandPost Body' })
  body: string;

  @ApiProperty({
    type: Array<BrandPostReferenceEntity>,
    description: 'BrandPost References',
  })
  references: BrandPostReferenceEntity[];

  @ApiProperty({ type: Date, description: 'BrandPost Brand ID' })
  brandId: number;

  @ApiProperty({ type: Array<number>, description: 'BrandPost Topics' })
  topics: BrandPostToTopicEntryDto[];

  @ApiProperty({ type: Array<number>, description: 'BrandPost Related Items' })
  itemIds: number[];
}
