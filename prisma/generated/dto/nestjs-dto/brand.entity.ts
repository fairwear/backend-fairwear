
import {Item} from './item.entity'
import {UserToBrand} from './userToBrand.entity'
import {TopicToBrand} from './topicToBrand.entity'


export class Brand {
  id: number ;
name: string ;
items?: Item[] ;
UserToBrand?: UserToBrand[] ;
topics?: TopicToBrand[] ;
}
