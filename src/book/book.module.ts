import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/book.entity';
import { Borrowing } from 'src/borrowings/borrowings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book,Borrowing])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {
}
