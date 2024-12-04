import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from 'src/users/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login endpoint
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // Signup endpoint
  @Post('signup')
  async signup(@Body() body: { email: string; password: string; role: Role }) {
    return this.authService.signup(body.email, body.password, body.role);
  }
}
