import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Request } from 'express'; // Import Request type

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Handle login request
  @Post('login')
  async login(@Body() authDto: AuthDto, @Req() req: Request) {
    const ipAddress = req.ip; // Extract IP address from request
    return this.authService.login(authDto, ipAddress); // Pass IP to login method
  }

  // Handle signup request
  @Post('signup')
  async signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }
}
