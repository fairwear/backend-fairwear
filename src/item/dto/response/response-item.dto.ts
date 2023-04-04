import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ItemResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  brand: number;

  @ApiProperty({ type: Number })
  user: number;
}
