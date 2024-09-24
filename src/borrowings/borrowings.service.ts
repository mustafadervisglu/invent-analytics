import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrowing } from 'src/borrowings/borrowings.entity';
import { DataSource, IsNull, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Book } from 'src/book/book.entity';

@Injectable()
export class BorrowingsService {
  constructor(

    private dataSource: DataSource,
  ) {
  }

  async borrowBook(id: number, bookId: number): Promise<Borrowing> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager.findOne(User, { where: { id: id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const book = await queryRunner.manager.findOne(Book, { where: { id: bookId } });
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      const isBorrowed = await queryRunner.manager.findOne(Borrowing, {
        where: {
          book: { id: book.id },
          returnedAt: IsNull(),
        },
      });
      if (isBorrowed) {
        throw new BadRequestException('Book is already borrowed');
      }
      const borrowing = queryRunner.manager.create(Borrowing, {
        user: user,
        book: book,
      });
      await queryRunner.manager.save(borrowing);

      book.totalBorrows++;
      await queryRunner.manager.save(book);

      await queryRunner.commitTransaction();

      return borrowing;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    } finally {
      await queryRunner.release();
    }
  }

  async returnBook(userId: number, bookId: number, score?: number): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const borrowing = await queryRunner.manager.findOne(Borrowing, {
        where: {
          user: { id: userId },
          book: { id: bookId },
          returnedAt: IsNull(),
        },
        relations: ['book'],
      });
      if (!borrowing) throw new NotFoundException('Borrowing not found');

      borrowing.returnedAt = new Date();
      if (score !== undefined && score !== null) {
        borrowing.rating = score;

        const book = borrowing.book;
        book.scoreCounts += 1;
        book.scoreSum += score;

        book.calculateScore();

        await queryRunner.manager.save(book);
      }
      await queryRunner.manager.save(borrowing);

      await queryRunner.commitTransaction();
      return {
        message: 'The book has been returned',
        bookId: bookId,
        newScore: score !== undefined ? borrowing.book.score : undefined,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('The book could not be returned');
      }
    } finally {
      await queryRunner.release();
    }
  }
}
