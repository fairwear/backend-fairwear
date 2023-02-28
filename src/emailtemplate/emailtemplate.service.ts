import { Injectable } from '@nestjs/common';
import { CreateEmailtemplateDto } from './dto/request/create-emailtemplate.dto';
import { UpdateEmailtemplateDto } from './dto/request/update-emailtemplate.dto';

@Injectable()
export class EmailtemplateService {
  create(createEmailtemplateDto: CreateEmailtemplateDto) {
    return 'This action adds a new emailtemplate';
  }

  findAll() {
    return `This action returns all emailtemplate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailtemplate`;
  }

  update(id: number, updateEmailtemplateDto: UpdateEmailtemplateDto) {
    return `This action updates a #${id} emailtemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailtemplate`;
  }
}
