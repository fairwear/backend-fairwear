import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto){
    
    @ApiProperty({ type: Number })
    id: number;
    
    @ApiProperty({ type: String })
    name: string;
    
    @ApiProperty({ type: String })
    score: string;

    // @ApiProperty({ type: Number })
    // brandId: number;

    // @ApiPropertyOptional({ type: Array<Number> })
    // topicIds: number[] | null;

    // @ApiProperty({ type: Array<Number> })
    // userIds: number[];

    // @ApiPropertyOptional({ type: Array<Number> })
    // reportIds: number[] | null;
}
