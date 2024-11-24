/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema, Document } from 'mongoose';

const difficultyLevelEnum = ['Beginner', 'Intermediate ', 'Advanced '];
export interface Course extends Document {
  title: string;
  description: string;
  category: string;
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  createdBy: string;
  createdAt: Date;
}

const CourseSchema = new Schema<Course>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  difficultyLevel: {
    type: String,
    enum: difficultyLevelEnum,
    required: true,
  },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model <Course>("course",CourseSchema)
