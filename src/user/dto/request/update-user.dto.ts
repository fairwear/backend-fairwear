import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserRequest } from './create-user.dto';

export class UpdateUserRequest extends PartialType(CreateUserRequest) {
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

  @ApiProperty({ type: Array<number> })
  roleIds: number[];

  @ApiPropertyOptional({ type: String })
  refreshToken: string | null;

  @ApiPropertyOptional({ type: Date })
  updatedAt: Date | null;
}
