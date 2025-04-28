import { EmailEntity } from '../entity/email.entity';

export abstract class IEmailRepository {
  abstract save(data: Partial<EmailEntity>): Promise<EmailEntity>;
  abstract findAll(): Promise<EmailEntity[]>;
  abstract findOne(id: string): Promise<EmailEntity | null>;
  abstract delete(id: string): Promise<void>;
}
