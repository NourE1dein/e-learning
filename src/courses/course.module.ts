import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { course, CourseSchema } from 'src/schemas/course.schema';
import { UsersModule } from 'src/users/user.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: course.name, schema: CourseSchema }]), // Register the `courseModel`
    UsersModule, // Import UserModule to access `userModel`
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [MongooseModule ,CourseService ],

})
export class CourseModule {}
