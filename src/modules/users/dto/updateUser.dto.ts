import { IsString, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  language: string;

  @IsString()
  specialization: string;
}
