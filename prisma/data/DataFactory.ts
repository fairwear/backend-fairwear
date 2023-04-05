import { UserRoleToUser, UserRole } from '@prisma/client';
import { BrandEntity } from '../../src/brand/entities/brand.entity';
import { BrandPostToItemEntity } from '../../src/brandpost/entities/brandpost-to-item.entity';
import { BrandPostToTopicEntity } from '../../src/brandpost/entities/brandpost-to-topic.entity';
import { BrandPostVoteEntity } from '../../src/brandpost/entities/brandpost-vote.entity';
import { BrandPostEntity } from '../../src/brandpost/entities/brandpost.entity';
import { EmailTemplateEntity } from '../../src/emailtemplate/entities/emailtemplate.entity';
import { ItemEntity } from '../../src/item/entity/item-entity';
import { ReportEntity } from '../../src/report/entities/report.entity';
import { TopicEntity } from '../../src/topic/entities/topic.entity';
import { UserEntity } from '../../src/user/entities/user.entity';
import { BrandPostVoteEntry } from '../../src/brandpost/dto/request/entry/brandpost-vote.dto';

export class DataFactory {
  [x: string]: any;
  public static instance: DataFactory;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public constructor() {}

  public static getInstance(): DataFactory {
    if (!DataFactory.instance) {
      DataFactory.instance = new DataFactory();
    }
    return DataFactory.instance;
  }

  // --------------------------------
  // Email Template test data

  public getValidEmailTemplate() {
    const emailTemplate: EmailTemplateEntity = new EmailTemplateEntity();
    emailTemplate.name = 'Test name 1';
    emailTemplate.subject = 'Test subject 1';
    emailTemplate.body = 'Test body 1';
    emailTemplate.createdAt = new Date('2021-01-01T00:00:00.000Z');
    emailTemplate.updatedAt = new Date('2021-01-02T00:00:00.000Z');
    emailTemplate.deletedAt = null;

    return emailTemplate;
  }

  public getEmailTemplateList() {
    const emailTemplateList: EmailTemplateEntity[] = [];

    const emailTemplate1: EmailTemplateEntity = this.getValidEmailTemplate();

    const emailTemplate2: EmailTemplateEntity = new EmailTemplateEntity();
    emailTemplate2.name = 'Test name 2';
    emailTemplate2.subject = 'Test subject 2';
    emailTemplate2.body = 'Test body 2';
    emailTemplate2.createdAt = new Date('2021-02-01T00:00:00.000Z');
    emailTemplate2.updatedAt = null;
    emailTemplate2.deletedAt = null;

    const emailTemplate3: EmailTemplateEntity = new EmailTemplateEntity();
    emailTemplate3.name = 'Test name 3';
    emailTemplate3.subject = 'Test subject 3';
    emailTemplate3.body = 'Test body 3';
    emailTemplate3.createdAt = new Date('2021-03-01T00:00:00.000Z');
    emailTemplate3.updatedAt = new Date('2021-03-02T00:00:00.000Z');
    emailTemplate3.deletedAt = new Date('2021-03-03T00:00:00.000Z');

    emailTemplateList.push(emailTemplate1);
    emailTemplateList.push(emailTemplate2);
    emailTemplateList.push(emailTemplate3);

    return emailTemplateList;
  }

  // ------------User Template Test Data--------------------
  public getValidUser() {
    const roleToUser = this.getValidRoleToUser();
    const user: UserEntity = new UserEntity();
    user.id = 1;
    user.username = 'Test username 1';
    user.email = 'Test email 1';
    user.password = 'Test password 1';
    user.name = 'Test name 1';
    user.surname = 'Test surname 1';
    user.refreshToken = 'Test refreshToken 1';
    user.createdAt = new Date();
    user.updatedAt = new Date('2021-01-02T00:00:00.000Z');
    user.deletedAt = null;
    user.roles = [roleToUser];

    return user;
  }

  public getUserList() {
    const userList: UserEntity[] = [];

    const user1: UserEntity = this.getValidUser();

    const user2: UserEntity = new UserEntity();
    user2.username = 'Test username 2';
    user2.password = 'Test password 2';
    user2.email = 'Test email 2';
    user2.name = 'Test name 2';
    user2.surname = 'Test surname 2';
    user2.password = 'Test password 2';
    user2.roles = [];

    const user3: UserEntity = new UserEntity();
    user3.username = 'Test username 3';
    user3.password = 'Test password 3';
    user3.email = 'Test email 3';
    user3.name = 'Test name 3';
    user3.surname = 'Test surname 3';
    user3.password = 'Test password 3';
    user3.roles = [];
    userList.push(user1);
    userList.push(user2);
    userList.push(user3);

    return userList;
  }

  // ------------User Role Test Data--------------------
  public getValidUserRole() {
    const userRole: UserRole = {
      id: 1,
      name: 'USER',
    };

    return userRole;
  }

  public getValidRoleToUser() {
    const roleToUser: UserRoleToUser = {
      userId: 1,
      roleId: 1,
    };

    return roleToUser;
  }
  // -------------Report Test Data-------------------
  public getValidReport() {
    const report: ReportEntity = new ReportEntity();
    report.createdAt = new Date('2021-01-01T00:00:00.000Z');
    report.authorId = 1;
    report.reportReason = 'Test report reason 1';
    report.comment = 'Test comment 1';
    report.status = 'SUBMITTED';

    return report;
  }
  public getReportList() {
    const reportList: ReportEntity[] = [];

    const report1: ReportEntity = this.getValidReport();

    const report2: ReportEntity = new ReportEntity();
    report2.createdAt = new Date('2021-02-01T00:00:00.000Z');
    report2.authorId = 2;
    report2.reportReason = 'Test report reason 2';
    report2.comment = 'Test comment 2';
    report2.status = 'SUBMITTED';

    const report3: ReportEntity = new ReportEntity();
    report3.createdAt = new Date('2021-03-01T00:00:00.000Z');
    report3.authorId = 3;
    report3.reportReason = 'Test report reason 3';
    report3.comment = 'Test comment 3';
    report3.status = 'SUBMITTED';

    reportList.push(report1);
    reportList.push(report2);
    reportList.push(report3);

    return reportList;
  }

  // ---------------Item Test Data-----------------

  public getValidItem() {
    const item: ItemEntity = new ItemEntity();
    item.name = 'Test name 1';
    item.brandId = 1;
    item.userId = 1;
    item.createdAt = new Date('2021-01-01T00:00:00.000Z');
    item.updatedAt = null;
    item.deletedAt = null;

    return item;
  }

  public getItemList() {
    const itemList: ItemEntity[] = [];

    const item1: ItemEntity = this.getValidItem();

    const item2: ItemEntity = new ItemEntity();
    item2.name = 'Test name 2';

    const item3: ItemEntity = new ItemEntity();
    item3.name = 'Test name 3';

    itemList.push(item1);
    itemList.push(item2);
    itemList.push(item3);

    return itemList;
  }

  // ---------------Brand Test Data-----------------

  public getValidBrand() {
    const brand: BrandEntity = new BrandEntity();
    brand.name = 'Test name 1';
    brand.userId = 1;
    brand.createdAt = new Date('2021-01-01T00:00:00.000Z');

    return brand;
  }

  public getBrandList() {
    const brandList: BrandEntity[] = [];

    const brand1: BrandEntity = this.getValidBrand();

    const brand2: BrandEntity = new BrandEntity();
    brand2.name = 'Test name 2';

    const brand3: BrandEntity = new BrandEntity();
    brand3.name = 'Test name 3';

    brandList.push(brand1);
    brandList.push(brand2);
    brandList.push(brand3);

    return brandList;
  }

  // ---------------Topic Test Data-----------------

  public getValidTopic() {
    const topic: TopicEntity = new TopicEntity();
    topic.name = 'Test name 1';

    return topic;
  }

  public getTopicList() {
    const topicList: TopicEntity[] = [];

    const topic1: TopicEntity = this.getValidTopic();

    const topic2: TopicEntity = new TopicEntity();
    topic2.name = 'Test name 2';

    const topic3: TopicEntity = new TopicEntity();
    topic3.name = 'Test name 3';

    topicList.push(topic1);
    topicList.push(topic2);
    topicList.push(topic3);

    return topicList;
  }

  // -----------------BrandPost Test Data--------------------

  public getValidBrandPost() {
    const brandPost: BrandPostEntity = new BrandPostEntity();
    brandPost.body = 'Test body 1';
    brandPost.authorId = 1;
    brandPost.brandId = 1;
    brandPost.createdAt = new Date('2021-01-01T00:00:00.000Z');
    brandPost.deletedAt = null;
    brandPost.topics = [this.getValidBrandPostToTopic()];
    brandPost.relatedItems = [this.getValidBrandPostToItem()];
    brandPost.votes = [this.getValidBrandPostUpvote()];

    return brandPost;
  }

  public getValidBrandPostUpvote() {
    const brandPostVote: BrandPostVoteEntity = new BrandPostVoteEntity();
    brandPostVote.userId = 1;
    brandPostVote.postId = 1;
    brandPostVote.vote = 'UPVOTE';
    brandPostVote.createdAt = new Date('2021-01-01T00:00:00.000Z');

    return brandPostVote;
  }
  public getValidBrandPostDownvote() {
    const brandPostVote: BrandPostVoteEntity = new BrandPostVoteEntity();
    brandPostVote.userId = 1;
    brandPostVote.postId = 1;
    brandPostVote.vote = 'DOWNVOTE';
    brandPostVote.createdAt = new Date('2021-01-02T00:00:00.000Z');

    return brandPostVote;
  }

  public getValidBrandPostToTopic() {
    const brandPostToTopic = new BrandPostToTopicEntity();
    brandPostToTopic.topicId = 1;
    brandPostToTopic.postId = 1;
    brandPostToTopic.isBad = false;

    return brandPostToTopic;
  }

  public getValidBrandPostVoteEntry() {
    const brandPostVoteEntry: BrandPostVoteEntry = new BrandPostVoteEntry();
    brandPostVoteEntry.postId = 1;
    brandPostVoteEntry.vote = 'DOWNVOTE';

    return brandPostVoteEntry;
  }

  public getValidBrandPostToItem() {
    const brandPostToItem = new BrandPostToItemEntity();
    brandPostToItem.itemId = 1;
    brandPostToItem.postId = 1;

    return brandPostToItem;
  }

  public getDeletedBrandPost() {
    const brandPost: BrandPostEntity = new BrandPostEntity();
    brandPost.body = 'Test body 1';
    brandPost.authorId = 1;
    brandPost.brandId = 1;
    brandPost.createdAt = new Date('2021-01-01T00:00:00.000Z');
    brandPost.deletedAt = new Date('2021-01-02T00:00:00.000Z');

    return brandPost;
  }

  public getBrandPostList() {
    const brandPostList: BrandPostEntity[] = [];

    const brandPost1: BrandPostEntity = this.getValidBrandPost();

    const brandPost2: BrandPostEntity = new BrandPostEntity();
    brandPost2.body = 'Test body 2';
    brandPost2.authorId = 2;
    brandPost2.brandId = 2;
    brandPost2.createdAt = new Date('2021-02-01T00:00:00.000Z');
    brandPost2.deletedAt = null;
    brandPost2.votes = [this.getValidBrandPostDownvote()];
    brandPost2.topics = [this.getValidBrandPostToTopic()];
    brandPost2.relatedItems = [];

    const brandPost3: BrandPostEntity = new BrandPostEntity();
    brandPost3.body = 'Test body 3';
    brandPost3.authorId = 3;
    brandPost3.brandId = 3;
    brandPost3.createdAt = new Date('2021-03-01T00:00:00.000Z');
    brandPost3.deletedAt = new Date('2021-03-02T00:00:00.000Z');
    brandPost3.votes = [];
    brandPost3.topics = [];
    brandPost3.relatedItems = [];

    brandPostList.push(brandPost1);
    brandPostList.push(brandPost2);
    brandPostList.push(brandPost3);

    return brandPostList;
  }
  // ---------------Other-----------------
}
// Hashed password 'password'
// $argon2id$v=19$m=65536,t=3,p=4$uOqMSIzsj7p29cW5MZBycQ$aHKi072CJODOLsLz3rKa9RBXvZOLgF+XcilEIc4Um10
