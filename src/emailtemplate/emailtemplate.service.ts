import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailTemplateEntity } from './entities/emailtemplate.entity';

@Injectable()
export class EmailTemplateService {
  constructor(private prisma: PrismaService) {}
  create(entity: EmailTemplateEntity) {
    const emailTemplate = this.prisma.emailTemplate.create({
      data: {
        name: entity.name,
        subject: entity.subject,
        body: entity.body,
        createdAt: entity.createdAt,
      },
    });
    return emailTemplate;
  }

  findAll() {
    const emailTemplates = this.prisma.emailTemplate.findMany();
    return emailTemplates;
  }

  async findById(id: number) {
    const emailTemplate = await this.prisma.emailTemplate.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return emailTemplate;
  }

  update(id: number, entity: EmailTemplateEntity) {
    const emailTemplate = this.prisma.emailTemplate.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
        subject: entity.subject,
        body: entity.body,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt,
      },
    });
    return emailTemplate;
  }

  async delete(id: number) {
    const deletedEntity = await this.prisma.emailTemplate.delete({
      where: {
        id: id,
      },
    });
    return deletedEntity;
  }
}
