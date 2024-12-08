import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseSchema } from './course.schema'; // Updated
import { ModuleSchema } from './module.schema';
import { QuizSchema } from './quiz.schema';
import { ResponseSchema } from './response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Module', schema: ModuleSchema },
      { name: 'Quiz', schema: QuizSchema },
      { name: 'Response', schema: ResponseSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
