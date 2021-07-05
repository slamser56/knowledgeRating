import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('healthcheck')
  healthcheck(): string {
    return 'ok';
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
