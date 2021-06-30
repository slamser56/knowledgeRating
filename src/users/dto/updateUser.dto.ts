import { IsString, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  age: number;

  @IsString()
  language: string;

  @IsString()
  specialization: string;
}
