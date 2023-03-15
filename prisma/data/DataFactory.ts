import { EmailTemplateEntity } from '../../src/emailtemplate/entities/emailtemplate.entity';
import { InfoPostToTopic } from '../../src/infopost/entities/infopost-to-topic.entity';
import { InfoPostVote } from '../../src/infopost/entities/infopost-vote.entity';
import { InfoPostEntity } from '../../src/infopost/entities/infopost.entity';
import { VoteEnum } from '@prisma/client';

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

  public getValidInfoPost() {
    const infoPost: InfoPostEntity = new InfoPostEntity();
    infoPost.id = 1;
    // infoPost.author = this.getValidUser();
    // infoPost.item = this.getValidItem();
    infoPost.votes = this.getInfoPostVoteList();
    infoPost.topics = this.getInfoPostToTopicsList();
    infoPost.createdAt = new Date('2021-01-01T00:00:00.000Z');
    infoPost.updatedAt = new Date('2021-01-02T00:00:00.000Z');
    infoPost.isDeleted = false;
    infoPost.deletedAt = null;

    return infoPost;
  }

  public getValidInfoPostToTopic() {
    const infoPostToTopic: InfoPostToTopic = new InfoPostToTopic();
    infoPostToTopic.infoPostId = 1;
    infoPostToTopic.topicId = 1;
    infoPostToTopic.score = 5;

    return infoPostToTopic;
  }

  public getInfoPostToTopicsList() {
    const infoPostToTopicsList: InfoPostToTopic[] = [];

    const infoPostToTopic1: InfoPostToTopic = this.getValidInfoPostToTopic();

    const infoPostToTopic2: InfoPostToTopic = new InfoPostToTopic();
    infoPostToTopic2.infoPostId = 1;
    infoPostToTopic2.topicId = 2;
    infoPostToTopic2.score = 10;

    const infoPostToTopic3: InfoPostToTopic = new InfoPostToTopic();
    infoPostToTopic3.infoPostId = 1;
    infoPostToTopic3.topicId = 3;
    infoPostToTopic3.score = 1;

    infoPostToTopicsList.push(infoPostToTopic1);
    infoPostToTopicsList.push(infoPostToTopic2);
    infoPostToTopicsList.push(infoPostToTopic3);

    return infoPostToTopicsList;
  }
  public getInfoPostVote() {
    const infoPostVote: InfoPostVote = new InfoPostVote();
    infoPostVote.id = 1;
    infoPostVote.infoPostId = 1;
    infoPostVote.userId = 1;
    infoPostVote.vote = VoteEnum.UPVOTE;
    infoPostVote.createdAt = new Date('2021-01-01T00:00:00.000Z');

    return infoPostVote;
  }

  public getInfoPostVoteList() {
    const infoPostVoteList: InfoPostVote[] = [];

    const infoPostVote1: InfoPostVote = this.getInfoPostVote();

    const infoPostVote2: InfoPostVote = new InfoPostVote();
    infoPostVote2.id = 2;
    infoPostVote2.infoPostId = 1;
    infoPostVote2.userId = 2;
    infoPostVote2.vote = VoteEnum.DOWNVOTE;
    infoPostVote2.createdAt = new Date('2021-01-02T00:00:00.000Z');

    const infoPostVote3: InfoPostVote = new InfoPostVote();
    infoPostVote3.id = 3;
    infoPostVote3.infoPostId = 1;
    infoPostVote3.userId = 3;
    infoPostVote3.vote = VoteEnum.UPVOTE;
    infoPostVote3.createdAt = new Date('2021-01-03T00:00:00.000Z');

    infoPostVoteList.push(infoPostVote1);
    infoPostVoteList.push(infoPostVote2);
    infoPostVoteList.push(infoPostVote3);

    return infoPostVoteList;
  }
}
