import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResponseDocument = Response & Document;

@Schema({ timestamps: true }) 
export class response {
  @Prop({ required: true })
  userId: string; // Reference to User

  @Prop({ required: true })
  quizId: string; // Reference to Quiz

  @Prop({ type: [String], required: true })
  answers: string[]; // User-provided answers

  @Prop({ required: true })
  score: number; // User's score for the quiz

  @Prop({ default: Date.now })
  submittedAt: Date; // Submission date and time
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
