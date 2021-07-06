import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { Public } from 'decorators/public.decorator';
import { Roles } from 'decorators/roles.decorator';
import { Role } from 'enums/role.enum';
import { ExcludeNullInterceptor } from 'interceptors/excludeNull.interceptor';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(new ExcludeNullInterceptor())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  @Roles(Role.Admin)
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() userDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
