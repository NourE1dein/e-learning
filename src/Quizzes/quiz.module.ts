import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from 'src/courses/course.controller';
import { CourseService } from 'src/courses/course.service';
import { course, CourseSchema } from 'src/schemas/course.schema';
import { UsersModule } from 'src/users/user.module';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { CourseModule } from 'src/courses/course.module';
import { ChapterModule } from 'src/coursemodule/Chapter.module';
import { Quiz, QuizSchema } from 'src/schemas/quiz.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]), // Register the `courseModel`
    UsersModule,
    CourseModule ,
    ChapterModule,// Import UserModule to access `userModel`
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
