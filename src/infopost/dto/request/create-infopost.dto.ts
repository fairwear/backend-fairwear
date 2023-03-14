import { ApiProperty } from '@nestjs/swagger';

export class CreateInfoPostDto {
  @ApiProperty({ type: Number })
  authorId: number;

  @ApiProperty({ type: Number })
  topicId: number;

  @ApiProperty({ type: Number })
  itemId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
