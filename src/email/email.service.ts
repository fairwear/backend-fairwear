import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { EmailInterface } from './entity/email-interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter;

  constructor(private prisma: PrismaService) {}

  static getInstance() {
    if (!EmailService.instance) {
      const prisma = new PrismaService();
      EmailService.instance = new EmailService(prisma);
    }
    return EmailService.instance;
  }

  async createLocalConnection() {
    const account = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const info = await this.transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: 'bar@example.com, baz@example.com',
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return this.transporter;
  }

  //   async createConnection() {
  //     this.transporter = nodemailer.createTransport({
  //       host: process.env.SMTP_HOST,
  //       port: process.env.SMTP_PORT,
  //       secure: process.env.SMTP_TLS === 'yes' ? true : false,
  //       auth: {
  //         user: process.env.SMTP_USERNAME,
  //         pass: process.env.SMTP_PASSWORD,
  //       },
  //     });
  //   }

  async verifyConnection() {
    return this.transporter.verify();
  }
  //CREATE TRANSPORTER
  getTransporter() {
    return this.transporter;
  }

  async findAll() {
    const emails = await this.prisma.email.findMany();

    return emails;
  }

  async findById(id: number) {
    const email = await this.prisma.email.findUniqueOrThrow({
      where: { id },
    });

    return email;
  }

  async createEmail() {
    const info = await this.transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: 'bar@example.com, baz@example.com',
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
    });

    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return 'This action creates a new email';
  }

  async sendEmail(
    requestId: string | number | string[],
    options: EmailInterface,
  ) {
    return await this.transporter
      .sendMail({
        from: `"chiragmehta900" ${process.env.SMTP_SENDER || options.from}`,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      })
      .then((info) => {
        console.log(`${requestId} - Mail sent successfully!!`);
        console.log(
          `${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`,
        );
        if (process.env.NODE_ENV === 'local') {
          console.log(
            `${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(
              info,
            )}`,
          );
        }
        return info;
      });
  }
}
