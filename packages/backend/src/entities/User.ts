import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Length, Matches } from 'class-validator';
// eslint-disable-next-line import/no-cycle
import { Todo } from './Todo';
import { emailRegExp } from '../constants/regExp.constants';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  @Matches(emailRegExp, { message: 'Invalid format' })
  email: string;

  @Column({ nullable: false })
  @Length(5, 15)
  password: string;

  @Column({ default: '' })
  accessToken: string;

  @Column({ default: '' })
  verificationToken: string;

  @Column({ default: '' })
  resetPasswordToken: string;

  @Column({ default: false })
  verify: boolean;

  @OneToMany(() => Todo, (todo: Todo) => todo.user)
  todos: Todo[];
}
