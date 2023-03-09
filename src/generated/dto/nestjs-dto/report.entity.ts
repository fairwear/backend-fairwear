
import {Status} from '@prisma/client'
import {User} from './user.entity'
import {Item} from './item.entity'


export class Report {
  id: number ;
createdAt: Date ;
author?: User ;
authorId: number ;
reportReason: string ;
comment: string ;
status: Status ;
item?: Item ;
itemId: number ;
}
