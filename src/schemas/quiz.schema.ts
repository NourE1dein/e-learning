import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum QuestionType {
  MCQ = 'MCQ',       // Multiple Choice Question
  TRUE_FALSE = 'TRUE_FALSE',  // True or False Question
  BOTH = 'BOTH'      // Both MCQ and True/False allowed
}

@Schema()
export class Quiz extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Chapter' })
  moduleId: string;

  @Prop({required: true})
  questions: {
    question: string;
    options: string[];
    correctAnswer?: string;    
    correctMCQAnswer?: string; 
  }[];

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ default: [] })
  studentsAttempted: Types.ObjectId[]; 
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

