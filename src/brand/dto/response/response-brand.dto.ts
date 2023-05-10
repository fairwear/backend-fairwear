import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseBrandPostDto } from '../../../brandpost/dto/response/response-brandpost.dto';
import { ItemResponse } from '../../../item/dto/response/response-item.dto';
import { TopicResponse } from '../../../topic/dto/response/response-topic.dto';

export class BrandResponse {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, nullable: true })
  imageUrl: string | null;

  @ApiProperty({ type: ItemResponse, isArray: true })
  items: ItemResponse[];

  @ApiProperty({ type: ResponseBrandPostDto, isArray: true })
  posts: ResponseBrandPostDto[];

  @ApiProperty({ type: TopicResponse, isArray: true })
  topics: TopicResponse[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date, nullable: true })
  updatedAt: Date | null;

  @ApiPropertyOptional({ type: Date, nullable: true })
  deletedAt: Date | null;
}
