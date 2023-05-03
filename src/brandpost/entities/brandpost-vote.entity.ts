import { VoteEnum } from '@prisma/client';
import { UserEntity } from '../../user/entities/user.entity';

export class BrandPostVoteEntity {
  vote: VoteEnum;
  createdAt: Date;
  postId: number;
  userId: number;
  user: UserEntity;
}
