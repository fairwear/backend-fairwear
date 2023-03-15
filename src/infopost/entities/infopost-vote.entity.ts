import { VoteEnum } from '@prisma/client';

export class InfoPostVote {
  id: number;
  vote: VoteEnum;
  userId: number;
  infoPostId: number;
  createdAt: Date;
}
