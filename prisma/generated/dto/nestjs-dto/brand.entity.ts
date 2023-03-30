
import {TopicToBrand} from './topicToBrand.entity'
import {Item} from './item.entity'


export class Brand {
  id: number ;
name: string ;
topics?: TopicToBrand[] ;
items?: Item[] ;
}
