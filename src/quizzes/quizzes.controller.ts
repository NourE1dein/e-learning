import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quiz.schema';
import { Response } from './response.schema';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  // Create a new quiz
  @Post()
  async createQuiz(@Body() quizData: Partial<Quiz>) {
    return this.quizzesService.createQuiz(quizData);
  }

  // Get all quizzes
  @Get()
  async getAllQuizzes() {
    return this.quizzesService.getAllQuizzes();
  }

  // Get a quiz by ID
  @Get(':id')
  async getQuizById(@Param('id') quizId: string) {
    return this.quizzesService.getQuizById(quizId);
  }

  // Submit a response to a quiz
  @Post(':id/submit')
  async submitResponse(
    @Param('id') quizId: string,
    @Body() responseData: Partial<Response>,
  ) {
    responseData.quizId = quizId; // Link response to the quiz
    return this.quizzesService.submitResponse(responseData);
  }

  // Get responses for a quiz
  @Get(':id/responses')
  async getResponsesByQuizId(@Param('id') quizId: string) {
    return this.quizzesService.getResponsesByQuizId(quizId);
  }
}
