import { ApiProperty } from '@nestjs/swagger';

export class ItemEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  brandId: number;

  @ApiProperty({ type: String })
  userId: number;
}
