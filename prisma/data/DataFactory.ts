import { RoleToUser } from '@prisma/client';
import { UserRole } from '@prisma/client';
import { ReportEntity } from '../../src/report/entities/report.entity';
import { EmailTemplateEntity } from '../../src/emailtemplate/entities/emailtemplate.entity';
import { BrandEntity } from '../../src/brand/entities/brand.entity';
import { UserEntity } from '../../src/user/entities/user.entity';
import { ItemEntity } from '../../src/item/entity/item-entity';
import { TopicEntity } from '../../src/topic/entities/topic.entity';

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
    user.username = 'Test username 1';
    user.password = 'Test password 1';
    user.email = 'Test email 1';
    user.name = 'Test name 1';
    user.surname = 'Test surname 1';
    user.password = 'Test password 1';
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
    user2.roles = [];

    const user3: UserEntity = new UserEntity();
    user3.username = 'Test username 3';
    user3.password = 'Test password 3';
    user3.email = 'Test email 3';
    user3.name = 'Test name 3';
    user3.surname = 'Test surname 3';
    user3.roles = [];
    userList.push(user1);
    userList.push(user2);
    userList.push(user3);

    return userList;
  }

  public getUserListSeed() {
    const userList: UserEntity[] = [];

    const user1: UserEntity = this.getValidUser();

    const user2: UserEntity = new UserEntity();
    user2.username = 'fairwear';
    user2.password = 'fairwear';
    user2.email = 'fairwear@gmail.com';
    user2.name = 'Fair';
    user2.surname = 'Wear';
    user2.roles = [];

    const user3: UserEntity = new UserEntity();
    user3.username = 'kernius';
    user3.password = 'kerniusss';
    user3.email = 'kernius@email.com';
    user3.name = 'Kernius';
    user3.surname = 'Survila';
    user3.roles = [];

    const user4: UserEntity = new UserEntity();
    user4.username = 'dominykas';
    user4.password = 'dominykas:)';
    user4.email = 'dominykas@gmail.com';
    user4.name = 'Dominykas';
    user4.surname = 'Kazlauskas';
    user4.roles = [];

    const user5: UserEntity = new UserEntity();
    user5.username = 'mortamm';
    user5.password = 'mortamm221';
    user5.email = 'mortam@gmail.com';
    user5.name = 'Morta';
    user5.surname = 'Matelyte';
    user5.roles = [];

    const user6: UserEntity = new UserEntity();
    user6.username = 'marius';
    user6.password = 'marius123';
    user6.email = 'marius@gmail.com';
    user6.name = 'Marius';
    user6.surname = 'Aurelijauskas';
    user6.roles = [];

    const user7: UserEntity = new UserEntity();
    user7.username = 'martynas12';
    user7.password = 'martynas123';
    user7.email = 'martynasgl@gmail.com';
    user7.name = 'Martynas';
    user7.surname = 'Glodenis';
    user7.roles = [];

    const user8: UserEntity = new UserEntity();
    user8.username = 'vaidas';
    user8.password = 'vaidas123';
    user8.email = 'vaidasku@gmail.com';
    user8.name = 'Vaidas';
    user8.surname = 'Kuizinas';
    user8.roles = [];

    const user9: UserEntity = new UserEntity();
    user9.username = 'tomas';
    user9.password = 'tomas123';
    user9.email = 'tomasd@gmail.com';
    user9.name = 'Tomas';
    user9.surname = 'Daukantas';
    user9.roles = [];

    const user10: UserEntity = new UserEntity();
    user10.username = 'monika';
    user10.password = 'monikal123';
    user10.email = 'monikali@gmail.com';
    user10.name = 'Monika';
    user10.surname = 'Lileikaite';
    user10.roles = [];

    const user11: UserEntity = new UserEntity();
    user11.username = 'mindaugas';
    user11.password = 'mindaugas123';
    user11.email = 'mindaugasglod@gmail.com';
    user11.name = 'Mindaugas';
    user11.surname = 'Glodenis';
    user11.roles = [];

    const user12: UserEntity = new UserEntity();
    user12.username = 'mariamonika';
    user12.password = 'mariamonika123';
    user12.email = 'monikammar@gmail.com';
    user12.name = 'Monika';
    user12.surname = 'Mairaite';
    user12.roles = [];

    userList.push(user1);
    userList.push(user2);
    userList.push(user3);
    userList.push(user4);
    userList.push(user5);
    userList.push(user6);
    userList.push(user7);
    userList.push(user8);
    userList.push(user9);
    userList.push(user10);
    userList.push(user11);
    userList.push(user12);

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

  public getBasicUserRole() {
    const userRole: UserRole = {
      id: 2,
      name: 'USER',
    };

    return userRole;
  }

  public getAdminUserRole() {
    const userRole: UserRole = {
      id: 3,
      name: 'ADMIN',
    };

    return userRole;
  }

  public getValidRoleToUser() {
    const roleToUser: RoleToUser = {
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

  // --------------------------------
  // Item test data

  public getValidItem() {
    const item: ItemEntity = new ItemEntity();
    item.name = 'Test name 1';

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

  // --------------------------------
  // Brand test data

  public getValidBrand() {
    const brand: BrandEntity = new BrandEntity();
    brand.name = 'Test name 1';

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

  // --------------------------------
  // Topic test data

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
}

// Hashed password 'password'
// $argon2id$v=19$m=65536,t=3,p=4$uOqMSIzsj7p29cW5MZBycQ$aHKi072CJODOLsLz3rKa9RBXvZOLgF+XcilEIc4Um10
