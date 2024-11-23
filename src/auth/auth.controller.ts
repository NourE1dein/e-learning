import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Handle user login
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  // Handle user signup
  @Post('signup')
  async signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }
}
