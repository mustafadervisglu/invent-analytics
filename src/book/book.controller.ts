import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { CreateBookDto } from 'src/book/book.dto';
import { Book } from 'src/book/book.entity';

@Controller('books')
export class BookController {
  constructor(
    private bookService: BookService,
  ) {
  }

  @Post()
  async createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.create(book);
  }

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.bookService.getBooks();
  }

  @Get(':id')
  async getBookById(id: number): Promise<Book> {
    return this.bookService.getBookById(id);
  }

}
