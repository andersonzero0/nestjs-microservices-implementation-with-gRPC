import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { IEmailServiceGRPC } from './interfaces/email.grpc.interface';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class EmailService implements OnModuleInit {
  private emailServiceGRPC: IEmailServiceGRPC;

  constructor(@Inject('EMAIL_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.emailServiceGRPC =
      this.client.getService<IEmailServiceGRPC>('EmailService');
  }

  async create() {
    return await this.emailServiceGRPC.send({
      receiver: 'user@test.com',
      subject: 'Test Email',
      attachments: [],
      body: 'Hello World',
    });
  }
}
