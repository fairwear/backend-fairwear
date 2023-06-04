import { ApiProperty } from '@nestjs/swagger';
import { BrandPostToTopicEntryDto } from './entry/brandpost-to-topic-entry.dto';

export class CreateBrandPostDto {
  @ApiProperty({ type: String, description: 'BrandPost Title' })
  title: string;

  @ApiProperty({ type: String, description: 'BrandPost Body' })
  body: string;

  @ApiProperty({
    type: String,
    description: 'BrandPost References',
    isArray: true,
  })
  sourceUrls: string[];

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
