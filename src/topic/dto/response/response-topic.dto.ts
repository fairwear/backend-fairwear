import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TopicToBrand } from '@prisma/client';

export class TopicResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: Number })
  topicId: number | null;

  @ApiProperty({ nullable: true })
  brands: TopicToBrand[];
}
