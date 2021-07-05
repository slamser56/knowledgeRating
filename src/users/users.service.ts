import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const password = await hash(userDto.password, 10);
    const newUser = new this.userModel({ ...userDto, password });
    return newUser.save();
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
