import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Borrowing } from 'src/borrowings/borrowings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Borrowing])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {
}
