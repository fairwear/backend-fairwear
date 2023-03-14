import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateInfoPostDto } from './create-infopost.dto';

export class UpdateInfoPostDto extends PartialType(CreateInfoPostDto) {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  authorId: number;

  @ApiProperty({ type: Number })
  topicId: number;

  @ApiProperty({ type: Number })
  itemId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date;
}
