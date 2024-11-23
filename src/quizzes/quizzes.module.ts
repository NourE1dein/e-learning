import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { QuizSchema } from './quiz.schema';
import { ResponseSchema } from './response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Quiz', schema: QuizSchema },
      { name: 'Response', schema: ResponseSchema },
    ]),
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
