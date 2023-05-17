import { VoteEnum } from '@prisma/client';
import UserInfoResponse from '../../../user/dto/response/user-info.response.dto';

export class UserVoteResponse {
  vote: VoteEnum;
  createdAt: Date;
  postId: number;
  userId: number;
  user: UserInfoResponse;
}
