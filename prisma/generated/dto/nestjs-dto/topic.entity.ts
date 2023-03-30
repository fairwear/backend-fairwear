
import {ItemToTopic} from './itemToTopic.entity'
import {TopicToBrand} from './topicToBrand.entity'
import {UserToTopic} from './userToTopic.entity'


export class Topic {
  id: number ;
name: string ;
items?: ItemToTopic[] ;
TopicToBrand?: TopicToBrand[] ;
UserToTopic?: UserToTopic[] ;
topicId: number ;
topic?: Topic ;
subtopic?: Topic[] ;
}
