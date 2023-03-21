import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateItemDto {

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  brandId: number;

  // @ApiPropertyOptional({ type: Array<Number> })
  // topicIds: number[] | null;

  @ApiProperty({ type: Array<Number> })
  userIds: number[];

  @ApiPropertyOptional({ type: Array<Number> })
  reportIds: number[] | null;
}
