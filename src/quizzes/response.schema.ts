/* eslint-disable prettier/prettier */
import mongoose, { Schema, Document } from 'mongoose';

export interface Response extends Document {
  userId: string;
  quizId: string;
  answers: any;
  correctAnswers: number;
  submittedAt: Date;
}

export const ResponseSchema = new Schema<Response>({
  userId: { type: String, required: true },
  quizId: { type: String, required: true },
  answers: { type: [String], required: true },
  correctAnswers: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
});
export default mongoose.model <Response>("response",ResponseSchema)
