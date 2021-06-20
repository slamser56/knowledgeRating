export class CreateUserDto {
  name: string;
  age: number;
  language: string;
  specialization: string;
}

export class UpdateUserDto {
  age: number;
  language: string;
  specialization: string;
}
