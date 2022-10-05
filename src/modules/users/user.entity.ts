import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'code', unique: true })
  code: string;

  @Column({ name: 'password', nullable: true })
  password: string;
}
