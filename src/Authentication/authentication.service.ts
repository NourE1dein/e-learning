import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoggingService } from './logging.service';

import { user, UserSchema } from "src/schemas/user.schema";
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user.name) private readonly userModel: Model<user>,
    private readonly jwtService: JwtService,
    private readonly loggingService: LoggingService, // Inject LoggingService
  ) {}

  // Handle user login
  async login(authDto: AuthDto, ipAddress: string) {
    const { email, password } = authDto;

    // Find the user by email
    const user = await this.userModel.findOne({ email }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Log failed login attempt
      this.loggingService.logFailedLogin(email, ipAddress);
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