import { ApiProperty } from '@nestjs/swagger';

export class BrandPostToItemEntity {
  @ApiProperty({ type: Number, description: 'BrandPost ID' })
  postId: number;

  @ApiProperty({ type: Number, description: 'Item ID' })
  itemId: number;
}
