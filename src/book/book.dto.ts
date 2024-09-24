import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;
}
