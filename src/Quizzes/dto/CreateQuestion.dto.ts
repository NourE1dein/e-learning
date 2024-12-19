import { IsString, IsArray, IsOptional } from 'class-validator';

export class QuestionDto {
  @IsString()
  question: string;  // The question text

  @IsArray()
  @IsString({ each: true })
  options: string[];  // List of options for MCQs or True/False

  @IsOptional()
  @IsString()
  correctAnswer?: string;  // For TRUE_FALSE type questions

  @IsOptional()
  @IsString()
  correctMCQAnswer?: string;  // For MCQ type questions
}