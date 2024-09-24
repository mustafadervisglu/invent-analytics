import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/user/user.dto';
import { Borrowing } from 'src/borrowings/borrowings.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Borrowing) private borrowingsRepository: Repository<Borrowing>,
  ) {
  }

  async createUser(userDto: UserDto): Promise<User> {
    try {
      const userExist = await this.userRepository.findOne({ where: { name: userDto.name } });
      if(userExist) {
        throw new HttpException('User Exist', 500);
      }
      const user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } catch(e) {
      throw e;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch(e) {
      return e;
    }
  }

  async getUserById(id: number): Promise<UserData> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if(!user) {
        throw new NotFoundException('User not found');
      }

      const [pastBorrowings, presentBorrowings] = await Promise.all([
        this.borrowingsRepository.createQueryBuilder('borrowing')
          .leftJoinAndSelect('borrowing.book', 'book')
          .where('borrowing.userId = :userId', { userId: id })
          .andWhere('borrowing.returnedAt IS NOT NULL')
          .select(['book.name', 'borrowing.rating'])
          .getMany(),
        this.borrowingsRepository.createQueryBuilder('borrowing')
          .leftJoinAndSelect('borrowing.book', 'book')
          .where('borrowing.userId = :userId', { userId: id })
          .andWhere('borrowing.returnedAt IS NULL')
          .select(['book.name'])
          .getMany(),
      ]);

      const past = pastBorrowings.map(b => ({
        name: b.book.name,
        userScore: b.rating,
      }));

      const present = presentBorrowings.map(b => ({
        name: b.book.name,
      }));

      return {
        id: user.id,
        name: user.name,
        books: {
          past,
          present,
        },
      };

    } catch(error) {
      if(error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

}
