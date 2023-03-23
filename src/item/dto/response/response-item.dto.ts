import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ItemResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;
}
