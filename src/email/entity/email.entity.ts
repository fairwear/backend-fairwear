import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmailStatus } from './email-status';
import { User } from '@prisma/client';

export class Email {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  subject: string;

  @ApiProperty({ type: String })
  body: string;

  @ApiProperty({ type: EmailStatus })
  status: EmailStatus;

  @ApiPropertyOptional({ type: Date })
  dateSent?: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty()
  user: User;

  @ApiProperty({ type: Number })
  userId: number;
}
