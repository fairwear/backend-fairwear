import { PartialType } from '@nestjs/swagger';
import { CreateInfopostDto } from './create-infopost.dto';

export class UpdateInfopostDto extends PartialType(CreateInfopostDto) {}
