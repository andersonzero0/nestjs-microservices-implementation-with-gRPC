import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { emailProviders } from './repository/email.providers';
import { DatabaseModule } from '../../database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../config/env.validation';

@Module({
  imports: [
    DatabaseModule,
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          auth: {
            user: configService.get<string>('SMTP_USERNAME'),
            pass: configService.get<string>('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: `"${configService.get<string>('EMAIL_FROM_NAME')}" <${configService.get<string>('EMAIL_FROM')}>`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...emailProviders, EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
