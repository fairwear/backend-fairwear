import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailTemplateEntity } from './entities/emailtemplate.entity';

@Injectable()
export class EmailTemplateService {
  constructor(private prisma: PrismaService) {}
  async create(entity: EmailTemplateEntity) {
    const emailTemplate = await this.prisma.emailTemplate.create({
      data: {
        name: entity.name,
        subject: entity.subject,
        body: entity.body,
        createdAt: entity.createdAt,
      },
    });
    return emailTemplate;
  }

  async findAll() {
    const emailTemplates = await this.prisma.emailTemplate.findMany();
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

  async update(id: number, entity: EmailTemplateEntity) {
    const emailTemplate = await this.prisma.emailTemplate.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
        subject: entity.subject,
        body: entity.body,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    });
    return emailTemplate;
  }

  async softDelete(id: number) {
    const deletedEntity = await this.prisma.emailTemplate.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedEntity;
  }
}
