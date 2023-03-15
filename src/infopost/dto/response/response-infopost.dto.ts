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

  @ApiProperty({ type: Date || null })
  updatedAt: Date | null;

  @ApiProperty({ type: Boolean, default: false })
  isDeleted: boolean;

  @ApiProperty({ type: Date || null })
  deletedAt: Date | null;
}
