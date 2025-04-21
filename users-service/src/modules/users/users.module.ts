import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailModule } from '../../services/email/email.module';

@Module({
  imports: [EmailModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
