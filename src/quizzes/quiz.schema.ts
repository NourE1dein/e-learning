/* eslint-disable prettier/prettier */
import mongoose, { Schema, Document } from 'mongoose';

export interface Question extends Document {
  questionText: string;
  options: string[];
  correctAnswer: string;
}
export interface Quiz extends Document {
  moduleId: string; // Reference to Module
  questions: Question[];
  createdAt: Date;
}

export const QuizSchema = new Schema<Quiz>({
  moduleId: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model <Quiz>("Quiz",QuizSchema)

