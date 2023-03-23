import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ItemEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;
}
