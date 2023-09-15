import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entities';

@Entity('Notes')
export class Notes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  title: string;

  @Column()
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
