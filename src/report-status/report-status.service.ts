import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusEnum } from '@prisma/client';
@Injectable()
export class ReportStatusService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.reportStatus.findMany();
  }

  async findById(id: number) {
    return await this.prisma.reportStatus.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByStatus(status: StatusEnum) {
    return await this.prisma.reportStatus.findUnique({
      where: {
        status: status,
      },
    });
  }

  async findByName(name: string) {
    if (name == 'SUBMITTED') {
      return await this.prisma.reportStatus.findUnique({
        where: {
          name: StatusEnum.SUBMITTED,
        },
      });
    } else if (name == 'PENDING') {
      return await this.prisma.reportStatus.findUnique({
        where: {
          name: StatusEnum.PENDING,
        },
      });
    } else if (name == 'RESOLVED') {
      return await this.prisma.reportStatus.findUnique({
        where: {
          name: StatusEnum.RESOLVED,
        },
      });
    }
  }
}
