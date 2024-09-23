import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  userScore?: number;

  @Column({ type: 'enum', enum: ['past', 'present'] })
  status: 'past' | 'present';

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}
