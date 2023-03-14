import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { InfoPostController } from './infopost.controller';
import { InfoPostService } from './infopost.service';

@Module({
  imports: [PrismaModule],
  controllers: [InfoPostController],
  providers: [InfoPostService, PrismaService],
})
export class InfoPostModule {}
