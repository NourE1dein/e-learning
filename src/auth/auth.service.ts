import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserDocument, Role } from 'src/users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  // User login
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).select('+passwordHash').exec();
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, role: user.role, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user._id, email: user.email, role: user.role },
    };
  }

  // User signup
  async signup(email: string, password: string, role: Role) {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, passwordHash, role });
    await newUser.save();

    return { message: 'Signup successful', user: newUser };
  }
}
