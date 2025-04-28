import { Provider } from '@nestjs/common';
import { IEmailRepository } from '../interfaces/email-repository.interface';
import { EmailRepository } from '../repository/email.repository';
import { DataSource } from 'typeorm';

export const emailRepositoryProvider: Provider = {
  provide: IEmailRepository,
  useFactory: (dataSource: DataSource) => new EmailRepository(dataSource),
  inject: ['DATA_SOURCE'],
};
