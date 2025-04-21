import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateEmail } from './interfaces/email.grpc.interface';
import { EmailEntity } from './entity/email.entity';
import { EMAIL_REPOSITORY } from './repository/email.providers';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    @Inject(EMAIL_REPOSITORY)
    private readonly emailRepository: Repository<EmailEntity>,
    private readonly mailerService: MailerService,
  ) {}

  private readonly logger = new Logger(EmailService.name);

  async send(data: CreateEmail): Promise<EmailEntity> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const email = await this.mailerService.sendMail({
        to: data.receiver,
        subject: data.subject,
        text: data.body,
      });

      if (!email) {
        throw new BadRequestException('Error sending email');
      }

      const emailEntity = await this.create(data);

      return emailEntity;
    } catch {
      throw new BadRequestException('Error sending email');
    }
  }

  async create(data: CreateEmail): Promise<EmailEntity> {
    try {
      const email = this.emailRepository.create(data);
      await this.emailRepository.save(email);
      return email;
    } catch {
      throw new BadRequestException('Error creating email entity');
    }
  }

  async findOne(id: string): Promise<EmailEntity> {
    return await this.emailRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<EmailEntity[]> {
    return await this.emailRepository.find();
  }

  async delete(id: string): Promise<void> {
    await this.emailRepository.delete({ id });
  }
}
