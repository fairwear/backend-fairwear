import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ReportEntity } from './entities/report.entity';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class ReportService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
  async create(entity: ReportEntity) {
    const response = await this.prisma.report.create({
      data: {
        authorId: entity.authorId,
        reportReason: entity.reportReason,
        createdAt: entity.createdAt,
        comment: entity.comment,
        status: entity.status,
        resolvedById: entity.resolvedById,
        resolvedAt: entity.resolvedAt,
        postId: entity.postId,
      },
    });

    const reportEntity: ReportEntity = {
      id: response.id,
      authorId: response.authorId,
      postId: response.postId,
      reportReason: response.reportReason,
      createdAt: response.createdAt,
      comment: response.comment,
      status: response.status,
      resolvedById: response.resolvedById,
      resolvedAt: response.resolvedAt,
    };
    return reportEntity;
  }

  async findAll() {
    const reports = await this.prisma.report.findMany();
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

  async update(id: number, entity: ReportEntity, userId: number) {
    const isUserAdmin = this.authService.isUserAdmin(userId);

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const updatedReport = await this.prisma.report.update({
      where: {
        id: id,
      },
      data: {
        reportReason: entity.reportReason,
        comment: entity.comment,
        status: entity.status,
      },
    });
    return updatedReport;
  }
}
