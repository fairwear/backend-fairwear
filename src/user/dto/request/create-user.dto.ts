import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
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

  @ApiProperty({ type: Array<number> })
  roleIds: number[];
}
