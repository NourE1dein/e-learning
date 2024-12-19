import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { QuestionBank } from 'src/schemas/QuestionBank.schema';
import { CreateQuestionBankDto } from 'src/QuestionBank/dto/createQuestionBank.dto';
import { chapter } from 'src/schemas/chapter.schema';
import { user } from 'src/schemas/user.schema';
import { UpdateQuestionBankDto } from './dto/UpdateQuestionBank.dto';
import { UpdateQuestionDto } from 'src/Quizzes/dto/updateQuestion.dto';

@Injectable()
export class QuestionBankService {
  constructor(
    @InjectModel(QuestionBank.name) private questionBankModel: Model<QuestionBank>,
    @InjectModel(chapter.name) private chapterModel: Model<chapter>,
    @InjectModel(user.name) private UserModel: Model<user> ,

  ) {}

  // Create a new question bank and associate it with a chapter
  async createQuestionBank(createQuestionBankDto: CreateQuestionBankDto , instructorId :string) {
    const { moduleId, questions } = createQuestionBankDto;

    const instructor = this.UserModel.findById(instructorId)
    if(!instructor) throw new HttpException('this instructor is not found',400)


    // Check if the chapter exists
    const existingChapter = await this.chapterModel.findById(moduleId);
    if (!existingChapter) {
      throw new NotFoundException('Chapter not found');
    }

    // Create a new question bank
    const questionBank = new this.questionBankModel({
        moduleId,
      questions,
    });

    const savedQuestionBank = await questionBank.save();

    // Associate the question bank with the chapter
    existingChapter.questionBankId = savedQuestionBank._id.toString();
    await existingChapter.save();

    return savedQuestionBank;
  }



  async getBankQuestions(questionBankId: string) {
    const bank = await this.questionBankModel.findById(questionBankId);
    
    if (!bank) {
      throw new HttpException('Bank not exist', 400);
    }
      return bank;
  }
  
async updateQuestionInBank(instructorId:string, questionBankId: string, questionId: string , updateQuestionDto:UpdateQuestionDto){
    try {
      const instructor = await this.UserModel.findById(instructorId);
      if (!instructor) throw new HttpException("Not an instructor", 400);
  
      //  Convert IDs to ObjectId
      const bankId = new mongoose.Types.ObjectId(questionBankId);
      const qId = new mongoose.Types.ObjectId(questionId);
  
      // Update the specific question inside the questions array
      const result = await this.questionBankModel.updateOne(
        { _id: bankId, "questions._id": qId }, // Find the document and the specific question
        {
          $set: {
            "questions.$.question": updateQuestionDto.question,         
            "questions.$.options": updateQuestionDto.options,            
            "questions.$.correctAnswer": updateQuestionDto.correctAnswer 
          }
        }
      );
  
      // Check if the update was successful
      if (result.modifiedCount === 0) {
        throw new HttpException("Question not found or no changes applied", 400);
      }
  
      return { message: "Question updated successfully" };
    } catch (error) {
      throw new HttpException(error.message || "An error occurred", 400);
    }
  }
  



async deleteQuestionFromBank(instructorId:string, questionBankId: string, questionId: string) {
  try {
    // Ensure IDs are valid ObjectId
    const instructor = this.UserModel.findById(instructorId)
    if(!instructor) throw new HttpException("not an instructor",400)

    const bankId = new mongoose.Types.ObjectId(questionBankId);
    const qId = new mongoose.Types.ObjectId(questionId);

    const result = await this.questionBankModel.updateOne(
      { _id: bankId }, // Match the question bank document
      { $pull: { questions: { _id: qId } } } // Remove the question by ID
    );

    if (result.modifiedCount === 0) {
      throw new HttpException('Question not found or already deleted', 400);
    }

    return { message: 'Question deleted successfully' };
  } catch (error) {
    throw new HttpException('Invalid ID format', 400);
  }
}

  
  }

