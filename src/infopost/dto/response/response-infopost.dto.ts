import { ApiProperty } from '@nestjs/swagger';
import { InfoPostToTopic, InfoPostVote } from '@prisma/client';

export class ResponseInfoPostDto {
  @ApiProperty({ type: Number })
  id: number;

  // @ApiProperty({ type: UserResponseDto })
  // author: UserResponseDto;

  // @ApiProperty({ type: ItemResponseDto })
  // item: ItemResponseDto;

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
