
import {UserRole} from '@prisma/client'
import {Report} from './report.entity'
import {UserToTopic} from './userToTopic.entity'
import {UserToItem} from './userToItem.entity'
import {Email} from './email.entity'


export class User {
  id: number ;
username: string ;
password: string ;
email: string ;
role: UserRole ;
name: string ;
surname: string ;
filesReport?: Report[] ;
UserToTopic?: UserToTopic[] ;
UserToItem?: UserToItem[] ;
Email?: Email[] ;
}
