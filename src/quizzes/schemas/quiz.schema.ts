import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: true })
  questions: string[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
