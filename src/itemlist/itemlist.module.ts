import { Module } from '@nestjs/common';
import { ItemlistService } from './itemlist.service';
import { ItemlistController } from './itemlist.controller';

@Module({
  controllers: [ItemlistController],
  providers: [ItemlistService]
})
export class ItemlistModule {}
