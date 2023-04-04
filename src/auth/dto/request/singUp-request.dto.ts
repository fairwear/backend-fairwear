import { ApiProperty } from '@nestjs/swagger';

export class SignupRequest {
  @ApiProperty({
    description: 'The username of the user',
    example: 'username',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'email',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'The surname of the user',
    example: 'surname',
    uniqueItems: true,
    required: true,
  })
  surname: string;
}
