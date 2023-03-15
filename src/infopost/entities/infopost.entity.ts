import { ApiProperty } from '@nestjs/swagger';
import { InfoPostToTopic, InfoPostVote, User, Item } from '@prisma/client';

export class InfoPostEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({})
  author: User;

  @ApiProperty({})
  item: Item;

  @ApiProperty({ type: Array<InfoPostVote> })
  votes: InfoPostVote[];

  @ApiProperty({ type: Array<InfoPostToTopic> })
  topics: InfoPostToTopic[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date || null })
  updatedAt: Date | null;

  @ApiProperty({ type: Boolean, default: false })
  isDeleted: boolean;

  @ApiProperty({ type: Date || null })
  deletedAt: Date | null;
}
