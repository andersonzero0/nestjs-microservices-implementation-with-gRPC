import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateEmail } from './interfaces/email.grpc.interface';
import { EmailEntity } from './entity/email.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { IEmailRepository } from './interfaces/email-repository.interface';

@Injectable()
export class EmailService {
  constructor(
    private readonly emailRepository: IEmailRepository,
    private readonly mailerService: MailerService,
  ) {}

  private readonly logger = new Logger(EmailService.name);

  async send(data: CreateEmail): Promise<EmailEntity> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const email = await this.mailerService.sendMail({
        to: data.receiver,
        subject: data.subject,
        template: './create-account-confirmation',
        context: {
          name: 'User',
          url: 'https://example.com/confirm',
        },
      });

      if (!email) {
        throw new BadRequestException('Error sending email');
      }

      const emailEntity = await this.create(data);

      return emailEntity;
    } catch (error) {
      console.error('Error sending email', error);
      throw new BadRequestException('Error sending email');
    }
  }

  async create(data: CreateEmail): Promise<EmailEntity> {
    return await this.emailRepository.save(data);
  }

  async findOne(id: string): Promise<EmailEntity> {
    return await this.emailRepository.findOne(id);
  }

  async findAll(): Promise<EmailEntity[]> {
    return await this.emailRepository.findAll();
  }

  async delete(id: string): Promise<void> {
    await this.emailRepository.delete(id);
  }
}
