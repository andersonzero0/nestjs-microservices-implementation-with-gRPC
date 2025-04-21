import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { ConsulService } from '../consul/consul.service';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'EMAIL_SERVICE',
          useFactory: async (consulService: ConsulService) => {
            const service = await consulService.getService('email-service');

            return {
              transport: Transport.GRPC,
              options: {
                package: 'email',
                protoPath: __dirname + '/interfaces/email.proto',
                url: `${service.Address}:${service.Port}`,
              },
            };
          },
          inject: [ConsulService],
        },
      ],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
