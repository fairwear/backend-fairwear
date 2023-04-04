import { ApiProperty } from '@nestjs/swagger';

export class UserRoleToUserEntity {
  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Number })
  roleId: number;
}
