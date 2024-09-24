import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad } from 'typeorm';
import { Exclude } from 'class-transformer';
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
  scoreCounts: number;

  @Column({ default: 0 })
  scoreSum: number;

  @Exclude()
  score: string = '-1';

  @AfterLoad()
  calculateScore() {
    if (this.scoreCounts > 0) {
      const avg = this.scoreSum / this.scoreCounts;
      this.score = avg.toFixed(2);
    } else {
      this.score = '-1';
    }
  }
}
