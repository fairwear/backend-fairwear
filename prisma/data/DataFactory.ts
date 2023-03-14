import { ItemEntity } from '../../src/item/entities/item.entity';
import { EmailTemplateEntity } from '../../src/emailtemplate/entities/emailtemplate.entity';
import { BrandEntity } from '../../src/brand/entities/brand.entity';

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
  // Item test data

  public getValidItem() {
    const item: ItemEntity = new ItemEntity();
    item.name = 'Test name 1';
    item.score = 'Test score 1';

    return item;
  }

  public getItemList() {
    const itemList: ItemEntity[] = [];

    const item1: ItemEntity = this.getValidItem();

    const item2: ItemEntity = new ItemEntity();
    item2.name = 'Test name 2';
    item2.score = 'Test score 2';
    

    const item3: ItemEntity = new ItemEntity();
    item3.name = 'Test name 3';
    item3.score = 'Test score 3';

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
}
