import { ApiProperty } from '@nestjs/swagger';
import { VoteEnum } from '@prisma/client';
export class VoteRequest {
  @ApiProperty({ type: Number })
  infoPostId: number;

  // TODO: This should be the user id of the logged in user, so this field should be removed later
  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: VoteEnum })
  vote: VoteEnum;
}
