import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/user.module';
import { CourseModule } from './courses/course.module';
import { ChapterModule } from './coursemodule/Chapter.module';
import { JwtModule } from '@nestjs/jwt';
//import { RbacMiddleware } from './Authentication/rbac.middleware';
import { LoggingService } from './Authentication/logging.service';
import { PerformanceModule } from './performance/performance.module';
import { QuizModule } from './Quizzes/quiz.module';
import { QuestionBankModule } from './QuestionBank/questionBank.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test', {
      autoIndex: true, // Automatically sync indexes with the schema
    }),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    CourseModule,
    ChapterModule,
    PerformanceModule,
    QuizModule,
    QuestionBankModule
  ],
  controllers: [],
  providers: [LoggingService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   // consumer.apply(RbacMiddleware).forRoutes('*');
  }

}