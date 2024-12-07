import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtStrategyFromPassport } from 'passport-jwt'; // Import as JwtStrategyFromPassport
import { UsersService } from '../users/users.service'; // Import UsersService

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(JwtStrategyFromPassport) {
  // Renamed class
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default-secret', // Secret key from env
    });
  }
}
