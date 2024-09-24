import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as process from 'node:process';
import { UserDto } from 'src/user/user.dto';
import { Borrowing } from 'src/borrowings/borrowings.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Borrowing) private borrowingsRepository: Repository<Borrowing>,
  ) {
  }

  async getUsers(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch(e) {
      return e;
    }
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

}
