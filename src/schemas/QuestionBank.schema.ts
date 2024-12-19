import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class QuestionBank extends Document {
  @Prop({ required: true })
  moduleId: string; // Associated module ID

  @Prop({
    type: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
        questionNumber: { type: Number }, // Replace _id with questionNumber
      },
    ],
  })
  questions: {
    questionNumber?: number; // Incremental question number
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export const QuestionBankSchema = SchemaFactory.createForClass(QuestionBank);

// Add pre-save hook to assign questionNumber
QuestionBankSchema.pre('save', function (next) {
  const questionBank = this as QuestionBank;

  // Assign question numbers incrementally
  if (questionBank.questions && questionBank.questions.length > 0) {
    questionBank.questions.forEach((question, index) => {
      question.questionNumber = index + 1; // Start from 1
    });
  }

  next();
});
