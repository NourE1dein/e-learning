/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';
import { JwtAuthStrategy } from './jwt.strategy';
import { user, UserSchema } from "src/schemas/user.schema";
import { UserService } from "src/users/user.service";

 // Import UsersService
//import { RbacMiddleware } from './rbac.middleware';  // Import RbacMiddleware
import { PassportModule } from '@nestjs/passport';

@Module({
   

  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: UserSchema }]), // Make sure User schema is correctly imported
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret', // Secret key from environment variables
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  controllers: [AuthController], // Controller for authentication
  providers: [
    AuthService,
    JwtAuthStrategy,
    UserService, // Add UsersService to providers
    //RbacMiddleware, // Add RbacMiddleware to providers
  ],
})
export class AuthModule {}


