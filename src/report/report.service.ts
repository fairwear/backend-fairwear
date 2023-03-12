import { Injectable } from '@nestjs/common';
import { ReportEntity } from './entities/report.entity';
import { PrismaService } from '../prisma/prisma.service';
import { StatusEnum } from '@prisma/client';
@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}
  create(entity: ReportEntity) {
    const basicReportStatus = this.prisma.reportStatus.findByName(
      StatusEnum.SUBMITTED,
    );
    const report = this.prisma.report.create({
      data: {
        authorId: entity.authorId,
        reportReason: entity.reportReason,
        itemId: entity.itemId,
        createdAt: entity.createdAt,
        comment: entity.comment,
        status: {
          create: {
            status: basicReportStatus.status?.id || 0,
          },
        },
      },
    });
    return report;
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
