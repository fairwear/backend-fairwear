import { ApiProperty } from '@nestjs/swagger';

export class BrandPostToTopicEntity {
  @ApiProperty({ type: Number, description: 'BrandPost ID' })
  postId: number;

  @ApiProperty({ type: Number, description: 'Topic ID' })
  topicId: number;

  @ApiProperty({
    type: Boolean,
    description: 'Is The Selected Topic Being Exploited?',
  })
  isBad: boolean;
}
