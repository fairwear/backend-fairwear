import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateEmailTemplateRequest } from './create-emailtemplate.dto';

export class UpdateEmailTemplateRequest extends PartialType(
  CreateEmailTemplateRequest,
) {
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
  updatedAt: Date | null;
}
