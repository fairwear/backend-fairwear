import { Module } from '@nestjs/common';
import { BrandpostService } from './brandpost.service';
import { BrandpostController } from './brandpost.controller';

@Module({
  controllers: [BrandpostController],
  providers: [BrandpostService],
})
export class BrandpostModule {}
