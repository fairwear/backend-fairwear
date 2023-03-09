
import {Brand} from './brand.entity'
import {ItemToTopic} from './itemToTopic.entity'
import {UserToItem} from './userToItem.entity'
import {Report} from './report.entity'


export class Item {
  id: number ;
name: string ;
score: string ;
brandId: number ;
brand?: Brand ;
topics?: ItemToTopic[] ;
UserToItem?: UserToItem[] ;
reports?: Report[] ;
}
