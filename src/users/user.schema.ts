/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema, Document } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userRoleEnum = ['student', 'instructor', 'admin'];

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
  profilePictureUrl: string;
  createdAt: Date;
}

// Mongoose schema for User
const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: userRoleEnum,
    required: true,
  },
  profilePictureUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model <User>("User",UserSchema)

