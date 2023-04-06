import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
