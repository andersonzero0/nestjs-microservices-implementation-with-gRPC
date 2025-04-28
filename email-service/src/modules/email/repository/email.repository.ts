import { EntityManager, Repository } from 'typeorm';
import { BaseRepository } from '../../../shared/base.repository';
import { EmailEntity } from '../entity/email.entity';
import { IEmailRepository } from '../interfaces/email-repository.interface';

export class EmailRepository
  extends BaseRepository
  implements IEmailRepository
{
  private emailRepository(
    entityManager?: EntityManager,
  ): Repository<EmailEntity> {
    return this.getRepository(EmailEntity, entityManager);
  }

  async save(data: Partial<EmailEntity>): Promise<EmailEntity> {
    const email = this.emailRepository().create(data);
    return await this.emailRepository().save(email);
  }

  async findAll() {
    return await this.emailRepository().find();
  }

  async findOne(id: string) {
    return await this.emailRepository().findOne({
      where: { id },
    });
  }

  async delete(id: string) {
    await this.emailRepository().delete({
      id,
    });
  }
}
