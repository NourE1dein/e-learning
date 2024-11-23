import { Schema, Document } from 'mongoose';

// TypeScript interface for a single question
interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

// TypeScript interface for Quiz
export interface Quiz extends Document {
  moduleId: string; // Reference to Module
  questions: Question[];
  createdAt: Date;
}

// Mongoose schema
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
