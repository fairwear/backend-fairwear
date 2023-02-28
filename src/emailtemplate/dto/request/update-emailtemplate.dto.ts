import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateEmailTemplate } from './create-emailtemplate.dto';

export class UpdateEmailTemplate extends PartialType(CreateEmailTemplate) {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  subject: string;

  @ApiProperty({ type: String })
  body: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt?: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date;
}
