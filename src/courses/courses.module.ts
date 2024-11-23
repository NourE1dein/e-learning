import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseSchema } from './course.schema';
import { ModuleSchema } from './module.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Module', schema: ModuleSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
