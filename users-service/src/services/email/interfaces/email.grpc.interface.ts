export interface IEmailServiceGRPC {
  send(data: CreateEmail): Promise<Email>;
  findOne(data: EmailById): Promise<Email>;
  findAll(): Promise<Email[]>;
  delete(data: EmailById): Promise<void>;
}

export class CreateEmail {
  receiver: string;
  subject: string;
  body: string;
  attachments: string[];
}

export class Email {
  id: string;
  receiver: string;
  subject: string;
  body: string;
  attachments: string[];
  createdAt: string;
}

export class EmailById {
  id: string;
}
