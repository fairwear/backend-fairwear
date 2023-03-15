import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTopicDto } from './create-topic.dto';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
    @ApiProperty({ type: Number })
    id: number;
    
    @ApiProperty({ type: String })
    name: string;
    
    // @ApiPropertyOptional({ type: Array<Number> })
    // itemIds: number[] | null;

    // @ApiPropertyOptional({ type: Array<Number> })
    // userIds: number[] | null;

    // @ApiPropertyOptional({ type: Array<Number> })
    // subtopicIds: number[] | null;
}
