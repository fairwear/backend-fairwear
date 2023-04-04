import { ApiProperty } from '@nestjs/swagger';

export class BrandPostToTopicEntryDto {
  @ApiProperty({ type: Number, description: 'Topic ID' })
  topicId: number;

  @ApiProperty({ type: Boolean, description: 'Is The Topic Violated' })
  isBad: boolean;
}
