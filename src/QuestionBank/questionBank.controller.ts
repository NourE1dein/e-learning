import { Controller, Post, Body, Param, Get, HttpException, Patch, Delete } from '@nestjs/common';
import { QuestionBankService } from 'src/QuestionBank/questionBank.service';
import { CreateQuestionBankDto } from 'src/QuestionBank/dto/createQuestionBank.dto';
import { isValidObjectId } from 'mongoose';
import { patch } from '@mui/material';
import { UpdateQuestionBankDto } from './dto/UpdateQuestionBank.dto';
import { UpdateQuestionDto } from 'src/Quizzes/dto/updateQuestion.dto';

@Controller('question-bank')
export class QuestionBankController {
  constructor(private readonly questionBankService: QuestionBankService) {}
// create question bank 
  @Post('createbank/:instrucorId')
  async createQuestionBank(@Body() createQuestionBankDto: CreateQuestionBankDto,
  @Param()instructorId :string) {
    return this.questionBankService.createQuestionBank(createQuestionBankDto, instructorId);
  }




// get question bank by id 
  @Get('getBankQuestions/:questionBankId')
  async getBankQuestions(@Param('questionBankId') questionBankId: string) {
    if (!isValidObjectId(questionBankId)) {
      throw new HttpException('Invalid Question Bank ID', 400);
    }
    return this.questionBankService.getBankQuestions(questionBankId);
  }
  
  @Patch('updateQuestionInBank/:questionBankId/:instructorId/:questionId')
  async updateQuestionInBank(
    @Param("instructorId") questionBankId: string,
    @Param("questionBankId") instructorId: string,
    @Param("questionId") questionId: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    
    // Call the service function to update the question
    return this.questionBankService.updateQuestionInBank(
      instructorId,
      questionBankId,
      questionId,
      updateQuestionDto,
    );
  }
  



    @Delete('deleteFromBank/:instructorId/:questionBankId/:questionId')
  async deleteQuestionFromBank(@Param("InstructorId")instructorId : string ,
  @Param("questionBankId")questionBankId : string  ,
  @Param("questionId") questionId:string){
      return this.questionBankService.deleteQuestionFromBank(instructorId,questionBankId , questionId)    
  } 
}