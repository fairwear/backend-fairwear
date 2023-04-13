import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  brandId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
