import { Schema, Document } from 'mongoose';

// TypeScript interface for User
export interface User extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'instructor' | 'admin';
  profilePictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for User
export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      required: true,
    },
    profilePictureUrl: { type: String },
  },
  { timestamps: true }, // createdat and updatedat fields
);
