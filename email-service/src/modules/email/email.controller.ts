import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateEmail,
  Email,
  EmailById,
  IEmailServiceGRPC,
} from './interfaces/email.grpc.interface';

@Controller()
export class EmailController implements IEmailServiceGRPC {
  constructor(private readonly emailService: EmailService) {}

  @GrpcMethod('EmailService', 'Send')
  async send(data: CreateEmail): Promise<Email> {
    return await this.emailService.send(data);
  }

  @GrpcMethod('EmailService', 'FindOne')
  findOne(data: EmailById): Promise<Email> {
    return this.emailService.findOne(data.id);
  }

  @GrpcMethod('EmailService', 'FindAll')
  findAll(): Promise<Email[]> {
    return this.emailService.findAll();
  }

  @GrpcMethod('EmailService', 'Delete')
  delete(data: EmailById): Promise<void> {
    return this.emailService.delete(data.id);
  }
}
