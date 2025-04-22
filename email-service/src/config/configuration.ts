import { EnvironmentVariables } from './env.validation';

export default (): EnvironmentVariables => ({
  HOST: process.env.HOST,
  HEALTH_CHECK_URL: process.env.HEALTH_CHECK_URL,
  GRPC_CONNECTION_URL: process.env.GRPC_CONNECTION_URL,
  GRPC_PORT: +process.env.GRPC_PORT || 5000,
  PORT: +process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: +process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  CONSUL_HOST: process.env.CONSUL_HOST,
  CONSUL_PORT: +process.env.CONSUL_PORT || 8500,
});
