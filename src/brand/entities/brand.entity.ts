import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BrandEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  imageUrl: string | null;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt: Date | null;

  @ApiPropertyOptional({ type: Date })
  deletedAt: Date | null;
}
