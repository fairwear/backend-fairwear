import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ type: String })
  name: string;
}
