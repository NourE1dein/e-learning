import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import Mongoose for MongoDB connection
import { AuthModule } from './auth/auth.module'; // Import AuthModule
import { UsersModule } from './users/users.module'; // Import UsersModule
import { CoursesModule } from './courses/courses.module'; // Import CoursesModule
import { QuizzesModule } from './quizzes/quizzes.module'; // Import QuizzesModule
import { AnalyticsModule } from './analytics/analytics.module'; // Import AnalyticsModule
import { ConfigModule } from '@nestjs/config'; // Optional: For better environment variable management
import { BackupModule } from './auth/backup.modulo';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables accessible globally
    }),

    // // MongoDB connection
    // MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/elearning', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }),

    // Modules for Auth, Users, Courses, Quizzes, and Analytics
    AuthModule,
    UsersModule,
    CoursesModule,
    QuizzesModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
@Module({
  imports: [BackupModule], // Register the BackupModule
})
export class AppModule {}
