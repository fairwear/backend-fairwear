import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  brandId: number;

  @ApiProperty({ type: Number })
  userId: number;
}
