import { Test, TestingModule } from '@nestjs/testing';
<<<<<<< HEAD:src/user/user.service.spec.ts
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRoleService } from 'src/user-role/user-role.service';
import { UserService } from './user.service';
=======
import { ReportService } from './report.service';
>>>>>>> eddc26fb4910bf1d592640c8eae13fe32bb220b4:src/report/report.service.spec.ts

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
<<<<<<< HEAD:src/user/user.service.spec.ts
      providers: [UserService, PrismaService, UserRoleService],
=======
      providers: [ReportService],
>>>>>>> eddc26fb4910bf1d592640c8eae13fe32bb220b4:src/report/report.service.spec.ts
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
