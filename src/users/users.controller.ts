import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return '';
  }

  @Get(':id')
  find(@Param('id') id: string): string {
    return id;
  }

  @Post()
  async create(@Body() CreateUserDto: CreateUserDto) {
    return CreateUserDto;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateUserDto: UpdateUserDto,
  ): string {
    return id;
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return id;
  }
}
