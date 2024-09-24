import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';


@Entity()
export class Borrowing {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  borrowedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnedAt: Date;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @ManyToOne(() => User, (user) => user.borrowings, { eager: true })
  user: User;

  @ManyToOne(() => Book, (book) => book.borrowings, { eager: true })
  book: Book;
}
