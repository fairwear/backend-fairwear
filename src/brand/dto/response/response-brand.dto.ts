import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BrandResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date, nullable: true })
  updatedAt: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt: Date | null;
}
