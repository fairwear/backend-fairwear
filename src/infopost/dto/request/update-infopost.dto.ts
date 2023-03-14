import { PartialType } from '@nestjs/swagger';
import { CreateInfoPostDto } from './create-infopost.dto';

export class UpdateInfoPostDto extends PartialType(CreateInfoPostDto) {}
