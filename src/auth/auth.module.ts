/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './jwt.strategy';
import { UserSchema } from '../users/user.schema';
import { UsersService } from '../users/users.service';  // Import UsersService
import { RbacMiddleware } from './rbac.middleware';  // Import RbacMiddleware

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Make sure User schema is correctly imported
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret', // Secret key from environment variables
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  controllers: [AuthController], // Controller for authentication
  providers: [
    AuthService,
    JwtAuthStrategy,
    UsersService, // Add UsersService to providers
    RbacMiddleware, // Add RbacMiddleware to providers
  ],
})
export class AuthModule {}
