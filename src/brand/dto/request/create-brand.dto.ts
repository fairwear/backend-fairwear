import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, nullable: true })
  imageUrl: string | null;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
