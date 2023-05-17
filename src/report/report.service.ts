import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReportEntity } from './entities/report.entity';
import { ReportStatusEnum } from '@prisma/client';
@Injectable()
export class ReportService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async create(entity: ReportEntity): Promise<ReportEntity> {
    const response = await this.prisma.report.create({
      data: {
        reportReason: entity.reportReason,
        status: ReportStatusEnum.PENDING,
        comment: entity.comment,
        authorId: entity.authorId,
        postId: entity.postId,
        createdAt: entity.createdAt,
      },
      include: {
        author: {
          include: {
            roles: true,
          },
        },
        post: true,
      },
    });

    return response;
  }

  async findAll() {
    const reports = await this.prisma.report.findMany({
      include: {
        author: {
          include: {
            roles: true,
          },
        },
        post: true,
      },
    });
    return reports;
  }

  async findById(id: number): Promise<ReportEntity> {
    const report = await this.prisma.report.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        author: {
          include: {
            roles: true,
          },
        },
        post: true,
      },
    });
    return report;
  }

  async update(
    id: number,
    entity: ReportEntity,
    userId: number,
  ): Promise<ReportEntity> {
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
        status: entity.status,
        reportResult: entity.reportResult,
        resolvedById: entity.resolvedById,
        resolvedAt: entity.resolvedAt,
      },
      include: {
        author: {
          include: {
            roles: true,
          },
        },
        post: true,
      },
    });
    return updatedReport;
  }
}
