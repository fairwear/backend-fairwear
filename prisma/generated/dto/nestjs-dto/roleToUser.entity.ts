import { User } from './user.entity';
import { UserRole } from './userRole.entity';

export class RoleToUser {
  user?: User;
  userId: number;
  roles?: UserRole;
  roleId: number;
}
