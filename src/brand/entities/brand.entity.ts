import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class BrandEntity {
    @ApiProperty({ type: Number })
    id: number;
    
    @ApiProperty({ type: String })
    name: string;

    // @ApiPropertyOptional({ type: Array<Number> })
    // topicIds: number[] | null;

    // @ApiProperty({ type: Array<Number> })
    // itemIds: number[] | null;
}
