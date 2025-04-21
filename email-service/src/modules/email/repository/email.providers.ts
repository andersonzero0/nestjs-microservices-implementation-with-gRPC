import { DataSource } from 'typeorm';
import { EmailEntity } from '../entity/email.entity';

export const EMAIL_REPOSITORY = 'EMAIL_REPOSITORY';

export const emailProviders = [
  {
    provide: EMAIL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EmailEntity),
    inject: ['DATA_SOURCE'],
  },
];
