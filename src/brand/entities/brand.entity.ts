import { ApiProperty } from '@nestjs/swagger';

export class BrandEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date | null;

  @ApiProperty({ type: Date })
  deletedAt: Date | null;
}
