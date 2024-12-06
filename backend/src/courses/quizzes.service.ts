import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './quiz.schema';
import { Response } from './response.schema';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel('Quiz') private readonly quizModel: Model<Quiz>,
    @InjectModel('Response') private readonly responseModel: Model<Response>,
  ) {}

  // Create a new quiz
  async createQuiz(quizData: Partial<Quiz>): Promise<Quiz> {
    const newQuiz = new this.quizModel(quizData);
    return newQuiz.save();
  }

  // Get all quizzes
  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  // Get a quiz by ID
  async getQuizById(quizId: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  // Submit a quiz response
  async submitResponse(responseData: Partial<Response>): Promise<Response> {
    const newResponse = new this.responseModel(responseData);
    return newResponse.save();
  }

  // Get responses for a quiz
  async getResponsesByQuizId(quizId: string): Promise<Response[]> {
    return this.responseModel.find({ quizId }).exec();
  }
}
