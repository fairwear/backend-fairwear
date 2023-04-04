import { Module } from '@nestjs/common';
import { BrandPostService } from './brandpost.service';
import { BrandPostController } from './brandpost.controller';

@Module({
  controllers: [BrandPostController],
  providers: [BrandPostService],
})
export class BrandpostModule {}
