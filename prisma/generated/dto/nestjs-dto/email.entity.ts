import { User } from './user.entity';

export class Email {
  id: number;
  user?: User;
  userId: number;
  subject: string;
  body: string;
  status: string;
  dateSent: Date | null;
  createdAt: Date;
}
