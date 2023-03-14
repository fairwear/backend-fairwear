import { ApiProperty } from '@nestjs/swagger';
import { RoleToUser } from '@prisma/client';

export class UserResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  surname: string;

  @ApiProperty({ type: Array<RoleToUser> })
  roles: RoleToUser[];
}
