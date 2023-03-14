import { Module } from '@nestjs/common';
import { InfopostService } from './infopost.service';
import { InfopostController } from './infopost.controller';

@Module({
  controllers: [InfopostController],
  providers: [InfopostService],
})
export class InfopostModule {}
