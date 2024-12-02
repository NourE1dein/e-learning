import { Schema, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
  profilePictureUrl: string;
  createdAt: Date;
}

// Mongoose schema for User
 const UserSchema = new Schema <User> ({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], required: true },
  profilePictureUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default UserSchema