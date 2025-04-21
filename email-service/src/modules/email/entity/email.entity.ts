import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('email')
export class EmailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  receiver: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @Column('simple-array', { nullable: true })
  attachments: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
}
