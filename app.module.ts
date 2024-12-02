import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import Mongoose for MongoDB connection

import { ConfigModule } from '@nestjs/config'; // Optional: For better environment variable management

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
