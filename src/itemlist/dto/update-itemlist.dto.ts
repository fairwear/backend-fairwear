import { PartialType } from '@nestjs/swagger';
import { CreateItemlistDto } from './create-itemlist.dto';

export class UpdateItemlistDto extends PartialType(CreateItemlistDto) {}
