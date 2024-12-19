import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { course, CourseSchema } from '../schemas/course.schema';
import { chapter, ChapterSchema } from '../schemas/chapter.schema';
import { user, UserSchema } from '../schemas/user.schema';
import { ChapterService } from './Chapter.service';
import { ChapterController } from './Chapter.controller';
import { CourseModule } from '../courses/course.module';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: chapter.name, schema: ChapterSchema },
      { name: user.name, schema: UserSchema }, // If needed directly in this module
    ]),
    CourseModule, // Import CourseModule to access courseModel
    UsersModule, // Import UsersModule if userModel is needed
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
  exports: [MongooseModule , ChapterModule,ChapterService], 
})
export class ChapterModule {}
