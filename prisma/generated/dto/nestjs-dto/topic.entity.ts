
import {UserToTopic} from './userToTopic.entity'
import {TopicToBrand} from './topicToBrand.entity'


export class Topic {
  id: number ;
name: string ;
UserToTopic?: UserToTopic[] ;
topicId: number  | null;
topic?: Topic  | null;
subtopic?: Topic[] ;
brands?: TopicToBrand[] ;
}
