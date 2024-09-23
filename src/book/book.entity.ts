import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  userScore?: number;

  @ManyToOne(() => User, (user) => user.pastBooks)
  pastUser: User;

  @ManyToOne(() => User, (user) => user.presentBooks)
  presentUser: User;
}
