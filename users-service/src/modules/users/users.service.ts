import { Injectable } from '@nestjs/common';
import { EmailService } from '../../services/email/email.service';

@Injectable()
export class UsersService {
  constructor(private readonly emailService: EmailService) {}

  async create() {
    return await this.emailService.create();
  }
}
