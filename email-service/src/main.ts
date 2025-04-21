import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { EnvironmentVariables } from './config/env.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');

  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'email',
      protoPath: join(__dirname, 'modules/email/interfaces/email.proto'),
      url: configService.get('GRPC_CONNECTION_URL'),
    },
  });

  await app.startAllMicroservices();

  await app.listen(configService.get('PORT'));

  logger.debug(`🚀 Email service (HTTP) is running on: ${await app.getUrl()}`);
  logger.debug(
    `🚀 Email service (gRPC) is running on: ${configService.get('GRPC_CONNECTION_URL')}`,
  );
}
bootstrap();
