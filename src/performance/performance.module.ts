import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerformanceController } from './performance.controller';
import { PerformanceService } from './performance.service';
import { Performance, PerformanceSchema } from 'src/schemas/Performance.schema';
import { CourseModule } from 'src/courses/course.module'; // Correct import
import { UsersModule } from 'src/users/user.module'; // Correct import
import { ChapterModule } from 'src/coursemodule/Chapter.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Performance.name, schema: PerformanceSchema }]), // Register schema
    CourseModule, // Import CourseModule to resolve courseModel dependency
    UsersModule, // Import UsersModule to resolve userModel dependency
    ChapterModule, 
  ],
  controllers: [PerformanceController],
  providers: [PerformanceService],
})
export class PerformanceModule {}
