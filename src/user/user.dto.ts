import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;
}
