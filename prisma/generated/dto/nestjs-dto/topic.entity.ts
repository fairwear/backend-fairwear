import { UserToTopic } from './userToTopic.entity';

export class Topic {
  id: number;
  name: string;
  UserToTopic?: UserToTopic[];
  topicId: number;
  topic?: Topic;
  subtopic?: Topic[];
}
