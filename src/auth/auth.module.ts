import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from '../users/user.schema';
import { JwtAuthStrategy } from './jwt.strategy';  // Correct import here

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret',  // Secret key from environment variables
      signOptions: { expiresIn: '1h' },  // Token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],  // Add JwtAuthStrategy to providers
})
export class AuthModule {}
