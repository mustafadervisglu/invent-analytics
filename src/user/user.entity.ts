import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from 'typeorm';
import { Book } from 'src/book/book.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.pastUser)
  pastBooks: Book[];

  @OneToMany(() => Book, (book) => book.presentUser)
  presentBooks: Book[];
}
