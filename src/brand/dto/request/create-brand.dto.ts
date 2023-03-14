import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBrandDto {
    @ApiProperty({ type: String })
    name: string;

    // @ApiPropertyOptional({ type: Array<Number> })
    // topicIds: number[] | null;

    // @ApiProperty({ type: Array<Number> })
    // itemIds: number[] | null;
}
