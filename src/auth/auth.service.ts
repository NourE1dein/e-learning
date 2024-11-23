import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../users/user.schema'; // Import user schema
import { AuthDto } from './auth.dto'; // Import DTO for login and signup

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Handle user login
  async login(authDto: AuthDto) {
    const { email, password } = authDto;
    
    // Find the user by email
    const user = await this.userModel.findOne({ email }).exec();
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { email: user.email, role: user.role, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Handle user signup
  async signup(authDto: AuthDto) {
    const { email, password, role } = authDto;

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    // Hash the password before saving it
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new this.userModel({
      email,
      passwordHash,
      role,
    });

    await newUser.save();

    return { message: 'Signup successful' };
  }
}
