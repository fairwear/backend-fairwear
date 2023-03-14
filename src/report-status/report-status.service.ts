import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportStatusEnum } from '@prisma/client';
@Injectable()
export class ReportStatusService {
  constructor(private prisma: PrismaService) {}
  // async findAll() {
  //   return await this.prisma.reportStatus.findMany();
  // }

  // async findById(id: number) {
  //   return await this.prisma.reportStatus.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  // async findByStatus(status: ReportStatusEnum) {
  //   return await this.prisma.reportStatus.findUnique({
  //     where: {
  //       status: status,
  //     },
  //   });
  // }

  // async findByName(name: string) {
  //   if (name == 'SUBMITTED') {
  //     return await this.prisma.reportToStatus.findUnique({
  //       where: {
  //         name: ReportStatusEnum.SUBMITTED,
  //       },
  //     });
  //   } else if (name == 'PENDING') {
  //     return await this.prisma.reportToStatus.findUnique({
  //       where: {
  //         name: ReportStatusEnum.PENDING,
  //       },
  //     });
  //   } else if (name == 'RESOLVED') {
  //     return await this.prisma.reportToStatus.findUnique({
  //       where: {
  //         name: ReportStatusEnum.RESOLVED,
  //       },
  //     });
  //   }
  // }
}
