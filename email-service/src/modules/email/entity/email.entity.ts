import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/base.entity';

@Entity('email')
export class EmailEntity extends BaseEntity {
  @Column()
  receiver: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @Column('simple-array', { nullable: true })
  attachments: string[];
}
