import { Injectable } from '@nestjs/common';
import { ReportEntity } from './entities/report.entity';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}
  async create(entity: ReportEntity) {
    const response = await this.prisma.report.create({
      data: {
        authorId: entity.authorId,
        reportReason: entity.reportReason,
        itemId: entity.itemId,
        createdAt: entity.createdAt,
        comment: entity.comment,
        status: entity.status,
      },
    });

    const reportEntity: ReportEntity = {
      id: response.id,
      authorId: response.authorId,
      reportReason: response.reportReason,
      itemId: response.itemId,
      createdAt: response.createdAt,
      comment: response.comment,
      status: response.status,
    };
    return reportEntity;
  }

  findAll() {
    const reports = this.prisma.report.findMany();
    return reports;
  }

  async findById(id: number) {
    const report = await this.prisma.report.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return report;
  }

  update(id: number, entity: ReportEntity) {
    const report = this.prisma.report.update({
      where: {
        id: id,
      },
      data: {
        authorId: entity.authorId,
        reportReason: entity.reportReason,
        itemId: entity.itemId,
        createdAt: entity.createdAt,
        comment: entity.comment,
        status: entity.status,
      },
    });
    return report;
  }

  // findByStatus(status: string) {
  //   const report = this.prisma.report.findMany({
  //     where: {
  //       status: status,
  //     },
  //   });
  //   return report;
  // }

  async delete(id: number) {
    const report = await this.prisma.report.delete({
      where: {
        id: id,
      },
    });
    return report;
  }
}
