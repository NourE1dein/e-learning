import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from 'src/courses/course.controller';
import { CourseService } from 'src/courses/course.service';
import { course, CourseSchema } from 'src/schemas/course.schema';
import { UsersModule } from 'src/users/user.module';
import { QuizService } from '../Quizzes/quiz.service';
import { QuizController } from '../Quizzes/quiz.controller';
import { CourseModule } from 'src/courses/course.module';
import { ChapterModule } from 'src/coursemodule/Chapter.module';
import { Quiz, QuizSchema } from 'src/schemas/quiz.schema';
import { QuestionBankController } from './questionBank.controller';
import { QuestionBankService } from './questionBank.service';
import { QuestionBank, QuestionBankSchema } from 'src/schemas/QuestionBank.schema';
import { QuizModule } from '../Quizzes/quiz.module';
import { chapter, ChapterSchema } from 'src/schemas/chapter.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: QuestionBank.name, schema: QuestionBankSchema },
        { name: chapter.name, schema: ChapterSchema },
    ]), // Register the `courseModel`

    UsersModule,
    CourseModule ,
    ChapterModule,
    QuizModule// Import UserModule to access `userModel`
  ],
  controllers: [QuestionBankController],
  providers: [QuestionBankService],
})
export class QuestionBankModule {}
