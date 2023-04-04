
import {ReportStatusEnum} from '@prisma/client'
import {User} from './user.entity'


export class Report {
  id: number ;
createdAt: Date ;
author?: User ;
authorId: number ;
reportReason: string ;
comment: string  | null;
status: ReportStatusEnum ;
}
