import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  // Get all quizzes
  @Get()
  getAllQuizzes() {
    return this.quizzesService.findAll();
  }

  // Create a new quiz
  @Post()
  createQuiz(@Body() createQuizDto: any) {
    return this.quizzesService.create(createQuizDto);
  }

  // Get a quiz by ID
  @Get(':id')
  getQuizById(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }
}
