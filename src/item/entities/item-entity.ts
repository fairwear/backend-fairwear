import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ItemEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  brand: number;

  @ApiProperty({ type: String })
  user: number;
}
