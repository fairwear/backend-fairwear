import { ApiProperty } from '@nestjs/swagger';

export class BrandPostReferenceEntity {
  @ApiProperty({
    type: Number,
    description: 'The id of the brand post reference',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'The title of the brand post reference',
  })
  title: string;

  @ApiProperty({
    type: Number,
    description: 'The Id of the related brand post',
  })
  postId: number;

  @ApiProperty({
    type: String,
    description: 'The body of the brand post reference',
    nullable: true,
  })
  body: string | null;

  @ApiProperty({
    type: String,
    description: 'The source url of the brand post reference',
    nullable: true,
  })
  sourceUrls: string[];

  @ApiProperty({
    type: Date,
    description: 'The date the brand post reference was created',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'The date the brand post reference was last updated',
    nullable: true,
  })
  updatedAt: Date | null;

  @ApiProperty({
    type: Date,
    description: 'The date the brand post reference was deleted',
    nullable: true,
  })
  deletedAt: Date | null;
}
