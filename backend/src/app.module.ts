import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';

// Importing schemas
import { UserSchema } from './users/user.schema';
import { CourseSchema } from './courses/course.schema'; // Updated
import { ModuleSchema } from './courses/module.schema';
import { ResponseSchema } from './courses/response.schema';
import { PerformanceSchema } from './analytics/performance.schema';

// Importing controllers
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CoursesController } from './courses/courses.controller';
import { CoursesService } from './courses/courses.service';
import { AnalyticsController } from './analytics/analytics.controller';
import { AnalyticsService } from './analytics/analytics.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { CreateCourseDto } from './courses/CreateCourses.dto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/ioioi'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'Module', schema: ModuleSchema },
      { name: 'Response', schema: ResponseSchema },
      { name: 'Performance', schema: PerformanceSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    UsersController,
    CoursesController,
    AnalyticsController,
    AuthController,
  ],
  providers: [
    UsersService,
    CoursesService,
    AnalyticsService,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
