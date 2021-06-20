import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string): User {
    return this.usersService.find(Number(id));
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const id = this.usersService.create(createUserDto);
    return { ...createUserDto, id };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): User {
    return this.usersService.delete(Number(id));
  }
}
