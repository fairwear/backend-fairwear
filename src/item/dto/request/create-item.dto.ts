import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, nullable: true })
  imageUrl: string | null;

  @ApiProperty({ type: String, nullable: true })
  barcode: string | null;

  @ApiProperty({ type: Number })
  brandId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
