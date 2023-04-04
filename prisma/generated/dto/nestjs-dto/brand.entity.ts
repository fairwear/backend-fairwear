
import {Item} from './item.entity'
import {UserToBrand} from './userToBrand.entity'


export class Brand {
  id: number ;
name: string ;
items?: Item[] ;
UserToBrand?: UserToBrand[] ;
}
