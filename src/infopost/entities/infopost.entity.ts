import { ApiProperty } from '@nestjs/swagger';
import { InfoPostToTopic, InfoPostVote } from '@prisma/client';

export class InfoPostEntity {
  @ApiProperty({ type: Number })
  id: number;

  //   @ApiProperty({})
  //   author: User;

  //   @ApiProperty({})
  //   item: Item;

  @ApiProperty({ type: Array<InfoPostVote> })
  votes: InfoPostVote[];

  @ApiProperty({ type: Array<InfoPostToTopic> })
  topics: InfoPostToTopic[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  deletedAt: Date;
}
