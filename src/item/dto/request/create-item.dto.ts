import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  brand: number;

  @ApiProperty({ type: Number })
  user: number;
}
