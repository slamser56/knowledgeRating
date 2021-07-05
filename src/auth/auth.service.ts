import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User, UserDocument } from 'users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findByUsernameQuery(username).select('+password').exec();
    const isCompared = compare(password, user?.password);
    if (isCompared) {
      return user;
    }
  }

  async login({ username, _id }: UserDocument) {
    const payload = { username, sub: _id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
