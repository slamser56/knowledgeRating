import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private readonly users: User[] = [];

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, userDto);
    if (user) {
      return user;
    }
    throw new HttpException({ status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async find(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    throw new HttpException({ status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }

  async delete(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (user) {
      return user;
    }
    throw new HttpException({ status: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
  }
}
