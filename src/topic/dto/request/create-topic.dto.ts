import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTopicDto {
    @ApiProperty({ type: String })
    name: string;
    
    @ApiProperty({ type: Number })
    topicId: number;
}
