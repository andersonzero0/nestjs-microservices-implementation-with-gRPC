import { Module } from '@nestjs/common';
import { EmailModule } from './modules/email/email.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { ConsulModule } from './services/consul/consul.module';
import { HealthModule } from './modules/health/health.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      expandVariables: true,
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    ConsulModule.register({
      options: {
        host: 'consul-server',
        port: 8500,
        secure: false,
        service: {
          id: 'email-service',
          name: 'email-service',
          address: 'app',
          port: 3000,
          tags: ['microservice', 'api'],
          check: {
            http: 'http://app:3000/health',
            interval: '10s',
          },
        },
      },
      isGlobal: true,
    }),
    DatabaseModule,
    EmailModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
