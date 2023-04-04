import { PartialType } from '@nestjs/swagger';
import { CreateBrandpostDto } from './create-brandpost.dto';

export class UpdateBrandpostDto extends PartialType(CreateBrandpostDto) {}
