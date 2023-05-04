import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from '../user/user.service';
import { BrandPostService } from '../brandpost/brandpost.service';

@Injectable()
export class TasksService {
  constructor(
    private userService: UserService,
    private brandPostService: BrandPostService,
  ) {}
  @Cron(CronExpression.EVERY_3_HOURS)
  async handleCron() {
    await this.userService.calculateAllUserTrustScores();
    await this.brandPostService.calculateScoreForAllPosts();
    console.log('Cron job executed');
  }
}
