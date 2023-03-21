import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    @ApiProperty({ type: Number })
    id: number;
    
    @ApiProperty({ type: String })
    name: string;

    // @ApiPropertyOptional({ type: Array<Number> })
    // topicIds: number[] | null;

    @ApiProperty({ type: Array<Number> })
    itemIds: number[] | null;
}
