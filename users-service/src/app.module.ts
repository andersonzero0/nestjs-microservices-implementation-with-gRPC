import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { EmailModule } from './services/email/email.module';
import { ConsulModule } from './services/consul/consul.module';

@Module({
  imports: [
    ConsulModule.register({
      options: {
        host: 'consul-server',
        port: 8500,
        secure: false,
        service: {
          id: 'users-service',
          name: 'users-service',
          address: 'app_users_service',
          port: 3001,
          tags: ['microservice', 'api'],
          check: {
            http: 'http://app_users_service:3001/health',
            interval: '10s',
          },
        },
      },
      isGlobal: true,
    }),
    UsersModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
