
import {RoleEnum} from '@prisma/client'
import {RoleToUser} from './roleToUser.entity'


export class UserRole {
  id: number ;
name: RoleEnum ;
users?: RoleToUser[] ;
}
