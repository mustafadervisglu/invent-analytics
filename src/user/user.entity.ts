import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from 'typeorm';
import { Book } from 'src/book/book.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
