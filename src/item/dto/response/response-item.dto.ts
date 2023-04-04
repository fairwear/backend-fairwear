import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ItemResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  brandId: number;

  @ApiProperty({ type: Number })
  userId: number;
}
