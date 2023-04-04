import { User } from './user.entity';
import { Topic } from './topic.entity';

export class UserToTopic {
  user?: User;
  userId: number;
  topic?: Topic;
  topicId: number;
}
