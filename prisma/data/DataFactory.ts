import { EmailTemplateEntity } from '../../src/emailtemplate/entities/emailtemplate.entity';
import { UserEntity } from '../../src/user/entities/user.entity';

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
    const user: UserEntity = new UserEntity();
    user.username = 'Test username 1';
    user.password = 'Test password 1';
    user.email = 'Test email 1';
    user.name = 'Test name 1';
    user.surname = 'Test surname 1';
    user.password = 'Test password 1';
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
}
