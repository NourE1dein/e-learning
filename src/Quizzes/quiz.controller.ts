// quiz.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/CreateQuiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Endpoint to create a quiz
  @Post('createQuiz/:instructorId')
  async createQuiz(@Body() createQuizDto: CreateQuizDto, @Param("instructorId")instructorId : string) {
    return this.quizService.createQuiz(instructorId , createQuizDto);
  }

  // Endpoint to get a quiz by ID
  @Get(':quizId')
  async getQuizByModule(@Param('quizId') quizId: string) {
    return this.quizService.getQuizById(quizId);
  }



  // Endpoint to get all quizzes
  @Get()
  async getAllQuizzes() {
    return this.quizService.getAllQuizzes();
  }



  @Patch('updateQuiz/:instrucorId/:quizId/:questionId')
  deleteQuestionFromQuiz( @Param("instructorId") instructorId: string,
   @Param("quizId")quizId : string, 
   @Param("questionId")questionId : string){

   return this.quizService.deleteQuestionFromQuiz(instructorId,quizId,questionId)
    
  }


  @Delete('deleteQuiz/:instructorId/:quizid')
  async deleteQuiz(@Param("instrucorId")instrucorId :string ,@Param("quizId")quizId :string){

   return this.quizService.deleteQuiz(instrucorId,quizId);

  }



  /*Endpoint to give real-time feedback
  @Post(':quizId/feedback')
  async giveFeedback(
    @Param('quizId') quizId: string,
    @Body() userAnswers: { [key: string]: string },
  ) {
    return this.quizService.giveFeedback(quizId, userAnswers);
  
}*/
}
