import { PartialType } from '@nestjs/swagger';
import { CreateBrandPostDto } from './create-brandpost.dto';

export class UpdateBrandPostDto extends PartialType(CreateBrandPostDto) {}
