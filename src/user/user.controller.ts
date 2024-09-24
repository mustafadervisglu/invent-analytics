import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { UserDto } from 'src/user/user.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserData> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }
}
