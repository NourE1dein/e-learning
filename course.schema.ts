import { Schema, Document } from 'mongoose';

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
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default CourseSchema;
