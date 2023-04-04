import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BrandEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;
}
