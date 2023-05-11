import { UserRole, UserRoleToUser } from '@prisma/client';
import * as argon2 from 'argon2';
import { BrandEntity } from '../../src/brand/entities/brand.entity';
import { BrandPostVoteEntry } from '../../src/brandpost/dto/request/entry/brandpost-vote.dto';
import { BrandPostToItemEntity } from '../../src/brandpost/entities/brandpost-to-item.entity';
import { BrandPostToTopicEntity } from '../../src/brandpost/entities/brandpost-to-topic.entity';
import { BrandPostVoteEntity } from '../../src/brandpost/entities/brandpost-vote.entity';
import { BrandPostEntity } from '../../src/brandpost/entities/brandpost.entity';
import { EmailTemplateEntity } from '../../src/emailtemplate/entities/emailtemplate.entity';
import { ItemEntity } from '../../src/item/entity/item-entity';
import { ReportEntity } from '../../src/report/entities/report.entity';
import { TopicEntity } from '../../src/topic/entities/topic.entity';
import { UserEntity } from '../../src/user/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();
const host =
  process.env.NODE_ENV === 'production' ? '193.219.91.103:5249' : 'localhost';

export class DataFactory {
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
  public getValidAdminUser() {
    const user: UserEntity = new UserEntity();
    user.username = 'marius';
    user.password = 'marius123';
    user.email = 'marius@gmail.com';
    user.name = 'Marius';
    user.surname = 'Aurelijauskas';
    user.createdAt = new Date();
    user.updatedAt = null;
    user.deletedAt = null;
    user.roles = [];

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

  public getAdminUserList() {
    const userList: UserEntity[] = [];

    const user1: UserEntity = this.getValidAdminUser();

    const user2: UserEntity = new UserEntity();

    user2.username = 'monika';
    user2.password = 'monikal123';
    user2.email = 'monikali@gmail.com';
    user2.name = 'Monika';
    user2.surname = 'Lileikaite';
    user2.createdAt = new Date();
    user2.updatedAt = null;
    user2.deletedAt = null;
    user2.roles = [];

    userList.push(user1);
    userList.push(user2);

    return userList;
  }

  public async getUserListSeed() {
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

    const newUserList = userList.map(async (user) => {
      const hashedPassword = await argon2.hash('password');
      user.password = hashedPassword;
      return user;
    });

    return await Promise.all(newUserList);
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

  // 1463324028667
  // 2324393736133
  // 2038898347412
  // 5666294548505
  // 3505354885521
  // 7255914145378
  // 8479721546456
  // 8286390821638
  // 3713156689866
  // 4815165146480
  // 2425668689664
  // 1456016468737
  // 0270322192228
  // 5126405856741
  // 5578290493663
  // 5380637225407
  // 5437791051847
  // 1990885717533
  // 7060577145146
  // 2118276239855
  // 3027973561066

  public getItemSeed() {
    const itemList: ItemEntity[] = [];

    const item1: ItemEntity = this.getValidItem();

    const item2: ItemEntity = new ItemEntity();
    item2.name = 'T-shirt';
    item2.brandId = 2;
    item2.userId = 2;
    item2.imageUrl = `http://${host}/src/uploads/tshirt-2.jpg`;
    item2.barcode = '1463324028667';
    item2.createdAt = new Date('2021-02-01T00:00:00.000Z');
    item2.updatedAt = new Date('2021-02-04T00:00:00.000Z');
    item2.deletedAt = null;

    const item3: ItemEntity = new ItemEntity();
    item3.name = 'Jeans';
    item3.brandId = 3;
    item3.userId = 3;
    item3.barcode = '2324393736133';
    item3.imageUrl = `http://${host}/src/uploads/jeans-3.jpg`;
    item3.createdAt = new Date('2021-03-01T00:00:00.000Z');
    item3.updatedAt = new Date('2021-03-04T00:00:00.000Z');
    item3.deletedAt = new Date('2021-03-05T00:00:00.000Z');

    const item4: ItemEntity = new ItemEntity();
    item4.name = 'Long sleeve shirt';
    item4.brandId = 4;
    item4.userId = 4;
    item4.barcode = '2038898347412';
    item4.imageUrl = `http://${host}/src/uploads/long-sleeve-shirt-4.jpg`;
    item4.createdAt = new Date('2021-04-01T00:00:00.000Z');
    item4.updatedAt = new Date('2021-04-04T00:00:00.000Z');
    item4.deletedAt = null;

    const item5: ItemEntity = new ItemEntity();
    item5.name = 'Short sleeve shirt';
    item5.brandId = 5;
    item5.userId = 5;
    item5.barcode = '5666294548505';
    item5.imageUrl = `http://${host}/src/uploads/short-sleeve-shirt-5.jpg`;
    item5.createdAt = new Date('2021-05-01T00:00:00.000Z');
    item5.updatedAt = new Date('2021-05-04T00:00:00.000Z');
    item5.deletedAt = new Date('2021-05-05T00:00:00.000Z');

    const item6: ItemEntity = new ItemEntity();
    item6.name = 'Sweater';
    item6.brandId = 6;
    item6.userId = 6;
    item6.barcode = '3505354885521';
    item6.imageUrl = `http://${host}/src/uploads/sweater-6.jpg`;
    item6.createdAt = new Date('2021-06-01T00:00:00.000Z');
    item6.updatedAt = new Date('2021-06-04T00:00:00.000Z');
    item6.deletedAt = null;

    const item7: ItemEntity = new ItemEntity();
    item7.name = 'Hoodie';
    item7.brandId = 7;
    item7.userId = 7;
    item7.barcode = '7255914145378';
    item7.imageUrl = `http://${host}/src/uploads/hoodie-7.jpg`;
    item7.createdAt = new Date('2021-07-01T00:00:00.000Z');
    item7.updatedAt = null;
    item7.deletedAt = null;

    const item8: ItemEntity = new ItemEntity();
    item8.name = 'Jacket';
    item8.brandId = 8;
    item8.userId = 8;
    item8.barcode = '8479721546456';
    item8.imageUrl = `http://${host}/src/uploads/jacket-8.jpg`;
    item8.createdAt = new Date('2021-08-01T00:00:00.000Z');
    item8.updatedAt = null;
    item8.deletedAt = new Date('2021-08-05T00:00:00.000Z');

    const item9: ItemEntity = new ItemEntity();
    item9.name = 'Coat';
    item9.brandId = 2;
    item9.userId = 7;
    item9.barcode = '8286390821638';
    item9.imageUrl = `http://${host}/src/uploads/coat-9.jpg`;
    item9.createdAt = new Date('2021-09-01T00:00:00.000Z');
    item9.updatedAt = null;
    item9.deletedAt = null;

    const item10: ItemEntity = new ItemEntity();
    item10.name = 'Sweatpants';
    item10.brandId = 3;
    item10.userId = 8;
    item10.barcode = '3713156689866';
    item10.imageUrl = `http://${host}/src/uploads/sweatpants-10.jpg`;
    item10.createdAt = new Date('2021-10-01T00:00:00.000Z');
    item10.updatedAt = null;
    item10.deletedAt = new Date('2021-10-05T00:00:00.000Z');

    const item11: ItemEntity = new ItemEntity();
    item11.name = 'Shorts';
    item11.brandId = 4;
    item11.userId = 9;
    item11.barcode = '4815165146480';
    item11.imageUrl = `http://${host}/src/uploads/shorts-11.jpg`;
    item11.createdAt = new Date('2021-11-01T00:00:00.000Z');
    item11.updatedAt = new Date('2021-11-04T00:00:00.000Z');
    item11.deletedAt = null;

    const item12: ItemEntity = new ItemEntity();
    item12.name = 'Midi Skirt';
    item12.brandId = 5;
    item12.userId = 10;
    item12.barcode = '2425668689664';
    item12.imageUrl = `http://${host}/src/uploads/midi-skirt-12.jpg`;
    item12.createdAt = new Date('2021-12-01T00:00:00.000Z');
    item12.updatedAt = new Date('2021-12-04T00:00:00.000Z');
    item12.deletedAt = new Date('2021-12-05T00:00:00.000Z');

    const item13: ItemEntity = new ItemEntity();
    item13.name = 'Mini Dress';
    item13.brandId = 6;
    item13.userId = 5;
    item13.barcode = '1456016468737';
    item13.imageUrl = `http://${host}/src/uploads/mini-dress-13.jpg`;
    item13.createdAt = new Date('2022-01-01T00:00:00.000Z');
    item13.updatedAt = new Date('2022-01-04T00:00:00.000Z');
    item13.deletedAt = null;

    const item14: ItemEntity = new ItemEntity();
    item14.name = 'Maxi Dress';
    item14.brandId = 7;
    item14.userId = 6;
    item14.barcode = '0270322192228';
    item14.imageUrl = `http://${host}/src/uploads/maxi-dress-14.jpg`;
    item14.createdAt = new Date('2022-02-01T00:00:00.000Z');
    item14.updatedAt = null;
    item14.deletedAt = null;

    const item15: ItemEntity = new ItemEntity();
    item15.name = 'Polo Shirt';
    item15.brandId = 8;
    item15.userId = 7;
    item15.barcode = '5126405856741';
    item15.imageUrl = `http://${host}/src/uploads/polo-shirt-15.jpg`;
    item15.createdAt = new Date('2022-03-01T00:00:00.000Z');
    item15.updatedAt = null;
    item15.deletedAt = new Date('2022-03-05T00:00:00.000Z');

    const item16: ItemEntity = new ItemEntity();
    item16.name = 'T-Shirt';
    item16.brandId = 2;
    item16.userId = 8;
    item16.barcode = '5578290493663';
    item16.imageUrl = `http://${host}/src/uploads/t-shirt-16.jpg`;
    item16.createdAt = new Date('2022-04-01T00:00:00.000Z');
    item16.updatedAt = null;
    item16.deletedAt = null;

    const item17: ItemEntity = new ItemEntity();
    item17.name = 'Pleated Pants';
    item17.brandId = 3;
    item17.userId = 9;
    item17.barcode = '5380637225407';
    item17.imageUrl = `http://${host}/src/uploads/pleated-pants-17.avif`;
    item17.createdAt = new Date('2022-05-01T00:00:00.000Z');
    item17.updatedAt = new Date('2022-05-04T00:00:00.000Z');
    item17.deletedAt = null;

    const item18: ItemEntity = new ItemEntity();
    item18.name = 'Puffer Jacket';
    item18.brandId = 4;
    item18.userId = 10;
    item18.barcode = '5437791051847';
    item18.imageUrl = `http://${host}/src/uploads/puffer-jacket-18.webp`;
    item18.createdAt = new Date('2022-06-01T00:00:00.000Z');
    item18.updatedAt = new Date('2022-06-04T00:00:00.000Z');
    item18.deletedAt = new Date('2022-06-05T00:00:00.000Z');

    const item19: ItemEntity = new ItemEntity();
    item19.name = 'Bomber Jacket';
    item19.brandId = 5;
    item19.userId = 5;
    item19.barcode = '1990885717533';
    item19.imageUrl = `http://${host}/src/uploads/bomber-jacket-19.jpg`;
    item19.createdAt = new Date('2022-07-01T00:00:00.000Z');
    item19.updatedAt = null;
    item19.deletedAt = null;

    const item20: ItemEntity = new ItemEntity();
    item20.name = 'Mock Neck Sweater';
    item20.brandId = 6;
    item20.userId = 6;
    item20.barcode = '7060577145146';
    item20.imageUrl = `http://${host}/src/uploads/mock-neck-sweater-20.webp`;
    item20.createdAt = new Date('2022-08-01T00:00:00.000Z');
    item20.updatedAt = null;
    item20.deletedAt = new Date('2022-08-05T00:00:00.000Z');

    const item21: ItemEntity = new ItemEntity();
    item21.name = 'Crew Neck Sweater';
    item21.brandId = 7;
    item21.userId = 4;
    item21.barcode = '2118276239855';
    item21.imageUrl = `http://${host}/src/uploads/crew-neck-sweater-21.jpg`;
    item21.createdAt = new Date('2022-09-01T00:00:00.000Z');
    item21.updatedAt = new Date('2022-09-04T00:00:00.000Z');
    item21.deletedAt = null;

    const item22: ItemEntity = new ItemEntity();
    item22.name = 'Turtleneck Sweater';
    item22.brandId = 8;
    item22.userId = 5;
    item22.barcode = '3027973561066';
    item22.imageUrl = `http://${host}/src/uploads/turtleneck-sweater-22.jpg`;
    item22.createdAt = new Date('2022-10-01T00:00:00.000Z');
    item22.updatedAt = null;
    item22.deletedAt = null;

    itemList.push(item1);
    itemList.push(item2);
    itemList.push(item3);
    itemList.push(item4);
    itemList.push(item5);
    itemList.push(item6);
    itemList.push(item7);
    itemList.push(item8);
    itemList.push(item9);
    itemList.push(item10);
    itemList.push(item11);
    itemList.push(item12);
    itemList.push(item13);
    itemList.push(item14);
    itemList.push(item15);
    itemList.push(item16);
    itemList.push(item17);
    itemList.push(item18);
    itemList.push(item19);
    itemList.push(item20);
    itemList.push(item21);
    itemList.push(item22);

    return itemList;
  }

  // ---------------Brand Test Data-----------------

  public getValidBrand() {
    const brand: BrandEntity = new BrandEntity();
    brand.name = 'Test name 1';
    brand.userId = 1;
    brand.createdAt = new Date('2021-01-01T00:00:00.000Z');
    brand.updatedAt = null;
    brand.deletedAt = null;
    brand.topics = [];
    brand.items = [];
    brand.posts = [];

    return brand;
  }

  public getBrandList() {
    const brandList: BrandEntity[] = [];

    const brand1: BrandEntity = this.getValidBrand();

    const brand2: BrandEntity = new BrandEntity();
    brand2.name = 'Test name 2';
    brand2.userId = 2;
    brand2.createdAt = new Date('2021-02-01T00:00:00.000Z');
    brand2.updatedAt = new Date('2021-02-04T00:00:00.000Z');
    brand2.deletedAt = null;

    const brand3: BrandEntity = new BrandEntity();
    brand3.name = 'Test name 3';
    brand3.userId = 3;
    brand3.createdAt = new Date('2021-03-01T00:00:00.000Z');
    brand3.updatedAt = new Date('2021-03-04T00:00:00.000Z');
    brand3.deletedAt = new Date('2021-03-05T00:00:00.000Z');

    brandList.push(brand1);
    brandList.push(brand2);
    brandList.push(brand3);

    return brandList;
  }

  public getBrandsSeed() {
    const brandList: BrandEntity[] = [];

    const brand1: BrandEntity = this.getValidBrand();

    const brand2: BrandEntity = new BrandEntity();
    brand2.name = 'Test name 2';
    brand2.userId = 2;
    brand2.createdAt = new Date('2021-02-01T00:00:00.000Z');
    brand2.updatedAt = new Date('2021-02-04T00:00:00.000Z');
    brand2.deletedAt = null;

    const brand3: BrandEntity = new BrandEntity();
    brand3.name = 'Test name 3';
    brand3.userId = 3;
    brand3.createdAt = new Date('2021-03-01T00:00:00.000Z');
    brand3.updatedAt = new Date('2021-03-04T00:00:00.000Z');
    brand3.deletedAt = new Date('2021-03-05T00:00:00.000Z');

    const brand4: BrandEntity = new BrandEntity();
    brand4.name = 'Test name 4';
    brand4.userId = 4;
    brand4.createdAt = new Date('2021-04-01T00:00:00.000Z');
    brand4.updatedAt = new Date('2021-04-04T00:00:00.000Z');
    brand4.deletedAt = new Date('2021-04-05T00:00:00.000Z');

    const brand5: BrandEntity = new BrandEntity();
    brand5.name = 'Test name 5';
    brand5.userId = 5;
    brand5.createdAt = new Date('2021-05-01T00:00:00.000Z');
    brand5.updatedAt = new Date('2021-05-04T00:00:00.000Z');
    brand5.deletedAt = new Date('2021-05-05T00:00:00.000Z');

    const brand6: BrandEntity = new BrandEntity();
    brand6.name = 'H&M';
    brand6.userId = 6;
    brand6.createdAt = new Date('2021-06-01T00:00:00.000Z');
    brand6.updatedAt = null;
    brand6.deletedAt = null;

    const brand7: BrandEntity = new BrandEntity();
    brand7.name = 'Zara';
    brand7.userId = 7;
    brand7.createdAt = new Date('2021-07-01T00:00:00.000Z');
    brand7.updatedAt = null;
    brand7.deletedAt = new Date('2021-07-05T00:00:00.000Z');

    const brand8: BrandEntity = new BrandEntity();
    brand8.name = 'Adidas';
    brand8.userId = 8;
    brand8.createdAt = new Date('2021-08-01T00:00:00.000Z');
    brand8.updatedAt = new Date('2021-08-04T00:00:00.000Z');
    brand8.deletedAt = null;

    const brand9: BrandEntity = new BrandEntity();
    brand9.name = 'Nike';
    brand9.userId = 9;
    brand9.createdAt = new Date('2021-09-01T00:00:00.000Z');
    brand9.updatedAt = null;
    brand9.deletedAt = null;

    const brand10: BrandEntity = new BrandEntity();
    brand10.name = 'Puma';
    brand10.userId = 10;
    brand10.createdAt = new Date('2021-10-01T00:00:00.000Z');
    brand10.updatedAt = null;
    brand10.deletedAt = null;

    const brand11: BrandEntity = new BrandEntity();
    brand11.name = 'Reebok';
    brand11.userId = 3;
    brand11.createdAt = new Date('2021-11-01T00:00:00.000Z');
    brand11.updatedAt = null;
    brand11.deletedAt = null;

    brandList.push(brand1);
    brandList.push(brand2);
    brandList.push(brand3);
    brandList.push(brand4);
    brandList.push(brand5);
    brandList.push(brand6);
    brandList.push(brand7);
    brandList.push(brand8);
    brandList.push(brand9);
    brandList.push(brand10);
    brandList.push(brand11);

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

  public getTopicsSeed() {
    const topicList: TopicEntity[] = [];

    const topic1: TopicEntity = this.getValidTopic();

    const topic2: TopicEntity = new TopicEntity();
    topic2.name = 'Test name 2';
    topic2.topicId = 2;

    const topic3: TopicEntity = new TopicEntity();
    topic3.name = 'Test name 3';
    topic3.topicId = 2;

    const topic4: TopicEntity = new TopicEntity();
    topic4.name = 'Animal Cruelty';
    topic4.topicId = null;

    const topic5: TopicEntity = new TopicEntity();
    topic5.name = 'Child Labor';
    topic5.topicId = null;

    const topic6: TopicEntity = new TopicEntity();
    topic6.name = 'Subtopic 2';
    topic6.topicId = 5;

    const topic7: TopicEntity = new TopicEntity();
    topic7.name = 'Unethical Labor Practices';
    topic7.topicId = null;

    const topic8: TopicEntity = new TopicEntity();
    topic8.name = 'Environmental Impact';
    topic8.topicId = null;

    const topic9: TopicEntity = new TopicEntity();
    topic9.name = 'Subtopic 3';
    topic9.topicId = 8;

    const topic10 = new TopicEntity();
    topic10.name = 'Subtopic 1';
    topic10.topicId = 4;

    topicList.push(topic1);
    topicList.push(topic2);
    topicList.push(topic3);
    topicList.push(topic4);
    topicList.push(topic5);
    topicList.push(topic6);
    topicList.push(topic7);
    topicList.push(topic8);
    topicList.push(topic9);
    topicList.push(topic10);

    return topicList;
  }

  // -----------------BrandPost Test Data--------------------

  public getValidBrandPost() {
    const brandPost: BrandPostEntity = new BrandPostEntity();
    brandPost.title = 'Test title 1';
    brandPost.body = 'Test body 1';
    brandPost.authorId = 1;
    brandPost.brandId = 1;
    brandPost.createdAt = new Date('2021-01-01T00:00:00.000Z');
    brandPost.deletedAt = null;
    brandPost.topics = [this.getValidBrandPostToTopic()];
    brandPost.relatedItems = [this.getValidBrandPostToItem()];
    brandPost.votes = [this.getValidBrandPostUpvote()];
    brandPost.postScore = 1;
    brandPost.references = [];
    brandPost.reports = [];
    brandPost.relatedItems = [];

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
    brandPost2.title = 'Test title 2';
    brandPost2.body = 'Test body 2';
    brandPost2.authorId = 2;
    brandPost2.brandId = 2;
    brandPost2.createdAt = new Date('2021-02-01T00:00:00.000Z');
    brandPost2.deletedAt = null;
    brandPost2.votes = [this.getValidBrandPostDownvote()];
    brandPost2.topics = [this.getValidBrandPostToTopic()];
    brandPost2.relatedItems = [];
    brandPost2.postScore = -1;
    brandPost2.references = [];
    brandPost2.reports = [];
    brandPost2.relatedItems = [];

    const brandPost3: BrandPostEntity = new BrandPostEntity();
    brandPost3.title = 'Test title 3';
    brandPost3.body = 'Test body 3';
    brandPost3.authorId = 3;
    brandPost3.brandId = 3;
    brandPost3.createdAt = new Date('2021-03-01T00:00:00.000Z');
    brandPost3.deletedAt = new Date('2021-03-02T00:00:00.000Z');
    brandPost3.votes = [];
    brandPost3.topics = [];
    brandPost3.relatedItems = [];
    brandPost3.postScore = 0;
    brandPost3.references = [];
    brandPost3.reports = [];
    brandPost3.relatedItems = [];

    brandPostList.push(brandPost1);
    brandPostList.push(brandPost2);
    brandPostList.push(brandPost3);

    return brandPostList;
  }

  public getBrandPostSeed() {
    const BrandPostList: BrandPostEntity[] = [];

    const brandPost1: BrandPostEntity = new BrandPostEntity();
    brandPost1.title = 'Test title 1';
    brandPost1.body = 'Test body 1';
    brandPost1.authorId = 1;
    brandPost1.brandId = 1;
    brandPost1.createdAt = new Date('2021-01-01T00:00:00.000Z');
    brandPost1.deletedAt = null;
    brandPost1.topics = [this.getValidBrandPostToTopic()];
    brandPost1.relatedItems = [this.getValidBrandPostToItem()];
    brandPost1.votes = [this.getValidBrandPostUpvote()];
    brandPost1.postScore = 2;
    brandPost1.references = [];
    brandPost1.reports = [];
    brandPost1.relatedItems = [];

    const brandPost2: BrandPostEntity = new BrandPostEntity();
    brandPost2.title = 'Test title 2';
    brandPost2.body = 'Test body 2';
    brandPost2.authorId = 2;
    brandPost2.brandId = 2;
    brandPost2.createdAt = new Date('2021-02-01T00:00:00.000Z');
    brandPost2.deletedAt = new Date('2021-02-02T00:00:00.000Z');
    brandPost2.topics = [this.getValidBrandPostToTopic()];
    brandPost2.relatedItems = [this.getValidBrandPostToItem()];
    brandPost2.votes = [this.getValidBrandPostUpvote()];
    brandPost2.postScore = 1;
    brandPost2.references = [];
    brandPost2.reports = [];
    brandPost2.relatedItems = [];

    const brandPost3: BrandPostEntity = new BrandPostEntity();
    brandPost3.title = 'Test title 3';
    brandPost3.body = 'Test body 3';
    brandPost3.authorId = 3;
    brandPost3.brandId = 3;
    brandPost3.createdAt = new Date('2021-03-01T00:00:00.000Z');
    brandPost3.deletedAt = null;
    brandPost3.topics = [this.getValidBrandPostToTopic()];
    brandPost3.relatedItems = [this.getValidBrandPostToItem()];
    brandPost3.votes = [this.getValidBrandPostUpvote()];
    brandPost3.postScore = 1;
    brandPost3.references = [];
    brandPost3.reports = [];
    brandPost3.relatedItems = [];

    const brandPost4: BrandPostEntity = new BrandPostEntity();
    brandPost4.title = 'Test title 4';
    brandPost4.body = 'Test body 4';
    brandPost4.authorId = 4;
    brandPost4.brandId = 4;
    brandPost4.createdAt = new Date('2021-04-01T00:00:00.000Z');
    brandPost4.deletedAt = null;
    brandPost4.topics = [this.getValidBrandPostToTopic()];
    brandPost4.relatedItems = [this.getValidBrandPostToItem()];
    brandPost4.votes = [this.getValidBrandPostUpvote()];
    brandPost4.postScore = 1;
    brandPost4.references = [];
    brandPost4.reports = [];
    brandPost4.relatedItems = [];

    BrandPostList.push(brandPost1);
    BrandPostList.push(brandPost2);
    BrandPostList.push(brandPost3);
    BrandPostList.push(brandPost4);

    return BrandPostList;
  }
  // ---------------Other-----------------
}
// Hashed password 'password'
// $argon2id$v=19$m=65536,t=3,p=4$uOqMSIzsj7p29cW5MZBycQ$aHKi072CJODOLsLz3rKa9RBXvZOLgF+XcilEIc4Um10
