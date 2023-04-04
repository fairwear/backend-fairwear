import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TopicEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: Number })
  topicId: number | null;
}
