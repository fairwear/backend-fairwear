
import {Subtopic} from './subtopic.entity'
import {ItemToTopic} from './itemToTopic.entity'
import {TopicToBrand} from './topicToBrand.entity'
import {UserToTopic} from './userToTopic.entity'


export class Topic {
  id: number ;
name: string ;
subtopics?: Subtopic[] ;
items?: ItemToTopic[] ;
TopicToBrand?: TopicToBrand[] ;
UserToTopic?: UserToTopic[] ;
}
