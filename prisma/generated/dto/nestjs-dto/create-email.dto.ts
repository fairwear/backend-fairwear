export class CreateEmailDto {
  subject: string;
  body: string;
  status: string;
  dateSent?: Date;
}
