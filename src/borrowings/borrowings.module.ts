import { Module } from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import { BorrowingsController } from './borrowings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Borrowing } from 'src/borrowings/borrowings.entity';
import { Book } from 'src/book/book.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Borrowing, User, Book])],
  controllers: [BorrowingsController],
  providers: [BorrowingsService],
})
export class BorrowingsModule {}
