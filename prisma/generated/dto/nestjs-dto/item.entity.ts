
import {Brand} from './brand.entity'
import {User} from './user.entity'


export class Item {
  id: number ;
name: string ;
brandId: number ;
brand?: Brand ;
user?: User ;
userId: number ;
}
