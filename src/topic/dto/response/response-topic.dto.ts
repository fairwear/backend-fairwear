import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TopicResponse {
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