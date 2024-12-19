// quiz.service.ts
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Quiz } from 'src/schemas/quiz.schema';

import { CreateQuizDto } from './dto/CreateQuiz.dto';
import { course } from 'src/schemas/Course.schema';
import { user } from 'src/schemas/user.schema';
import { chapter } from 'src/schemas/chapter.schema';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz> ,
  @InjectModel(course.name) private readonly courseModel: Model<course>, // Use course.name
  @InjectModel(user.name) private readonly userModel: Model<user>,
  @InjectModel(chapter.name) private readonly chapterModel: Model<chapter>, ) {}

  // Create a new quiz
  async createQuiz(instrucorId : string ,createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { moduleId, questions } = createQuizDto;

    const instructor = this.userModel.findById(instrucorId)
    if(!instructor)throw new HttpException('this is not an instructor',400)
    // Check if the module exists
    const module = await this.chapterModel.findById(moduleId);
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    // Create a new quiz
    const quiz = new this.quizModel({ moduleId, questions });
    const savedQuiz = await quiz.save();

    // Associate the quiz with the module
    module.quizId = savedQuiz._id.toString();
    await module.save();

    return savedQuiz;
  }




  // Get a quiz by ID
  async getQuizById(quizId: string  ): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      throw new NotFoundException('quiz not found');
    }


    return quiz ;
  }

  
  // Get all quizzes
  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }




  async deleteQuestionFromQuiz(instructorId: string, quizId: string, questionId: string) {
   
      const instructor = await this.userModel.findOne({instructorId});
      if (!instructor) {
        throw new HttpException('Not an instructor', 400);
      }
  
      const quiz = await this.quizModel.findById(quizId);
      if (!quiz) {
        throw new HttpException('Quiz not found', 404);
      }
  
      if (quiz.studentsAttempted && quiz.studentsAttempted.length > 0) {
        throw new HttpException('Quiz has been started by students, cannot edit or delete', 400);
      }
  
      const result = await this.quizModel.updateOne(
        { _id: quizId },
        { $pull: { questions: { _id: questionId } } } 
      );
  
      
      return { message: 'Question deleted successfully' };
    } 
    
  

    async deleteQuiz(instructorId: string, quizId: string) {
      // Ensure that the user is an instructor
      const instructor = await this.userModel.findOne({ instructorId });  // Fixed query
      if (!instructor) {
        throw new HttpException('Not an instructor', 400);
      }
    
      // Find the quiz by ID
      const quiz = await this.quizModel.findOne({quizId}); 
      console.log(quiz) // Fixed query to find by ID
      if (!quiz) {
        throw new HttpException('Quiz not found', 404);
      }
    
      // Check if the quiz has been started by any students
      if (quiz.studentsAttempted && quiz.studentsAttempted.length > 0) {
        throw new HttpException('Quiz has been started by students, cannot delete', 400);
      }
    
      // Delete the quiz
      await this.quizModel.findOneAndDelete({quizId});  // Deleting the whole quiz
    
      return { message: 'Quiz deleted successfully' };  // Return a success message
    }
    
    

  /*Real-time feedback based on user's answers
  async giveFeedback(quizId: string, userAnswers: { [key: string]: string }) {
    const quiz = await this.getQuizById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    const feedback = quiz.questions.map((question, index) => {
      const userAnswer = userAnswers[index];
      return {
        question: question.question,
        correct: question.correctAnswer === userAnswer,
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
      };
    });

    return feedback;
  }*/
 
}
