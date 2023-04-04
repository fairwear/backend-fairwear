export class EmailTemplate {
  id: number;
  name: string;
  subject: string;
  body: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
