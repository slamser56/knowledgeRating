import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'modules/auth/auth.service';
import { Public } from 'decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('healthcheck')
  healthcheck(): string {
    return 'ok';
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
