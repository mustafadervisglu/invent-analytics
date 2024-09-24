import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad } from 'typeorm';
import { Borrowing } from 'src/borrowings/borrowings.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
  borrowings: Borrowing[];

  @Column({ default: 0 })
  totalBorrows: number;

  @Column({ default: 0 })
  ratingsCount: number;

  @Column({ default: 0 })
  ratingsSum: number;

  averageRating: number = -1;

  @AfterLoad()
  calculateAverageRating() {
    this.averageRating =
      this.ratingsCount > 0 ? this.ratingsSum / this.ratingsCount : -1;
  }
}
