import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailTemplate {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  subject: string;

  @ApiProperty({ type: String })
  body: string;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
