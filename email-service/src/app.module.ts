import { Module } from '@nestjs/common';
import { EmailModule } from './modules/email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables, validate } from './config/env.validation';
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
    ConsulModule.registerAsync({
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        host: configService.get('CONSUL_HOST'),
        port: configService.get('CONSUL_PORT'),
        secure: false,
        service: {
          id: 'email-service',
          name: 'email-service',
          address: configService.get('HOST'),
          port: configService.get('GRPC_PORT'),
          tags: ['microservice', 'api'],
          check: {
            http: configService.get('HEALTH_CHECK_URL'),
            interval: '10s',
          },
        },
      }),
      inject: [ConfigService],
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
