import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Book } from 'src/book/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from 'src/book/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {
  }

  async create(book: CreateBookDto): Promise<Book> {
    const bookExist = await this.bookRepository.findOne({ where: { name: book.name } });
    if(bookExist) {
      throw new HttpException('Book Exist', 500);
    }
    try {
      const newBook = this.bookRepository.create(book);
      return await this.bookRepository.save(newBook);
    } catch(e) {
      throw e;
    }
  }

  async getBooks(): Promise<Book[]> {
    try {
      return await this.bookRepository.find({
        select: ['id', 'name'],
      });
    } catch(error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getBookById(id: number): Promise<any> {
    try {
      const book = await this.bookRepository.findOne({ where: { id } });
      if(!book) throw new NotFoundException('book not found');

      return {
        id: book.id,
        name: book.name,
        score: book.score,
      };

    } catch(error) {
      if(error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('something went wrong');
      }
    }
  }
}
