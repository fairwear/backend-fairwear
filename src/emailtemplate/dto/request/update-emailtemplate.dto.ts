import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailtemplateDto } from './create-emailtemplate.dto';

export class UpdateEmailtemplateDto extends PartialType(CreateEmailtemplateDto) {}
