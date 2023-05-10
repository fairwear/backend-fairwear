import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BrandPost, Item, Topic } from '@prisma/client';
import { BrandPostEntity } from '../../brandpost/entities/brandpost.entity';
import { ItemEntity } from '../../item/entity/item-entity';
import { TopicEntity } from '../../topic/entities/topic.entity';

export class BrandEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiPropertyOptional({ type: String, nullable: true })
  imageUrl: string | null;

  @ApiProperty({ type: ItemEntity, isArray: true })
  items: ItemEntity[] | Item[];

  @ApiProperty({ type: BrandPostEntity, isArray: true })
  posts: BrandPostEntity[] | BrandPost[];

  @ApiProperty({ type: Array<TopicEntity>, isArray: true })
  topics: TopicEntity[] | Topic[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt: Date | null;

  @ApiPropertyOptional({ type: Date })
  deletedAt: Date | null;
}
