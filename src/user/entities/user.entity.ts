import { ApiProperty } from '@nestjs/swagger';
import { UserRoleToUser } from '@prisma/client';
export class UserEntity {
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

  @ApiProperty({ type: Array<UserRoleToUser> })
  roles: UserRoleToUser[];

  @ApiProperty({ type: String })
  refreshToken: string | null;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date | null;

  @ApiProperty({ type: Date })
  deletedAt: Date | null;
}
