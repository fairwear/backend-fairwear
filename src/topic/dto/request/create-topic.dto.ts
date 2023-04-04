import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTopicDto {
    @ApiProperty({ type: String })
    name: string;
    
    @ApiPropertyOptional({ type: Number })
    topicId: number | null;
}
