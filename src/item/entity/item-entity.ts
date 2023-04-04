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

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date | null;

  @ApiProperty({ type: Date })
  deletedAt: Date | null;
}
