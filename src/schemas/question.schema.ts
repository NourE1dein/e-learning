import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

// Subdocument schema for a single Question
@Schema()
export class Question {
  @Prop({ required: true })
  question: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  correctAnswer: string;

  @Prop({ type: Types.ObjectId, auto: true }) // Auto-generated _id for subdocuments
  _id?: Types.ObjectId;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
