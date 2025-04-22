import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// C

// 1

// 2

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
