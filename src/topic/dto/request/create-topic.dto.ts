import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTopicDto {
    @ApiProperty({ type: String })
    name: string;
    
    // @ApiPropertyOptional({ type: Array<Number> })
    // itemIds: number[] | null;

    // @ApiPropertyOptional({ type: Array<Number> })
    // subtopicIds: number[] | null;
}
