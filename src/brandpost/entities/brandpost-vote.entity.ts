import { VoteEnum } from '@prisma/client';

export class BrandPostVoteEntity {
  vote: VoteEnum;
  createdAt: Date;
  postId: number;
  userId: number;
}
