import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BorrowingsService } from 'src/borrowings/borrowings.service';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

class BorrowBookDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class ReturnBookDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  score?: number;
}

@Controller('users/:userId')
export class BorrowingsController {
  constructor(
    private readonly borrowingsService: BorrowingsService,
  ) {
  }

  @Post('borrow/:bookId')
  borrowBook(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookId', ParseIntPipe) bookId: number,
  ) {
    return this.borrowingsService.borrowBook(userId, bookId);
  }

  @Post('return/:bookId')
  returnBook(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() returnBookDto: ReturnBookDto,
  ) {
    const { score } = returnBookDto;
    return this.borrowingsService.returnBook(userId, bookId, score);
  }
}


