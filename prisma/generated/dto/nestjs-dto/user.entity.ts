import { RoleToUser } from './roleToUser.entity';
import { Report } from './report.entity';
import { UserToTopic } from './userToTopic.entity';
import { Item } from './item.entity';
import { UserToBrand } from './userToBrand.entity';
import { Email } from './email.entity';

export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
  refreshToken: string | null;
  roles?: RoleToUser[];
  filesReport?: Report[];
  UserToTopic?: UserToTopic[];
  items?: Item[];
  brands?: UserToBrand[];
  Email?: Email[];
}
