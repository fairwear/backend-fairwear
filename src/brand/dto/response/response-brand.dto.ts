import { ApiProperty } from '@nestjs/swagger';

export class BrandResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;
}
