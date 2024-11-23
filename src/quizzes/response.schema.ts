import { Schema, Document } from 'mongoose';


export interface Response extends Document {
  userId: string; 
  quizId: string; 
  answers: any; 
  score: number;
  submittedAt: Date;
}

export const ResponseSchema = new Schema<Response>({
  userId: { type: String, required: true },
  quizId: { type: String, required: true },
  answers: { type: [String], required: true },
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
});
