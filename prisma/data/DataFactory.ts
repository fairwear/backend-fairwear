import { EmailTemplateEntity } from '../../src/emailtemplate/entities/emailtemplate.entity';
import { TopicEntity } from '../../src/topic/entities/topic.entity';

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
