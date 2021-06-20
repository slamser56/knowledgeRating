import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto): number {
    const id = this.users.length;
    this.users.push({ ...createUserDto, id });
    return id;
  }

  update(userId: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex(({ id }) => id === userId);
    if (userIndex === -1) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }
    const updatedUser = { ...this.users[userIndex], ...updateUserDto, id: userId };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  findAll(): User[] {
    return this.users;
  }

  find(userId: number): User | undefined {
    const user = this.users.find(({ id }) => id === userId);
    if (!user) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  delete(userId: number): User {
    const userIndex = this.users.findIndex(({ id }) => id === userId);
    if (userIndex === -1) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }
    return this.users.splice(userIndex, 1)[0];
  }
}
