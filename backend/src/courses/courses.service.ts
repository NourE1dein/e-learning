import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';
import { CreateCourseDto } from './CreateCourses.dto';
import { User } from '../users/user.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto, instructorId: string): Promise<Course> {
    const instructor = await this.userModel.findById(instructorId).exec();
    if (!instructor || instructor.role !== 'instructor') {
      throw new ForbiddenException('Only instructors can create courses.');
    }

    const newCourse = new this.courseModel({
      ...createCourseDto,
      createdBy: instructorId,
    });
    return newCourse.save();
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async getCourseById(courseId: string): Promise<Course> {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async updateCourse(courseId: string, updateCourseDto: Partial<Course>): Promise<Course> {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (updateCourseDto.createdBy && updateCourseDto.createdBy !== course.createdBy) {
      throw new ForbiddenException('You cannot modify a course you do not own.');
    }

    return this.courseModel.findByIdAndUpdate(courseId, updateCourseDto, { new: true }).exec();
  }

  async uploadMedia(courseId: string, file: Express.Multer.File): Promise<any> {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    course.resources.push({
      filename: file.originalname,
      path: file.path,
    });

    await course.save();
    return { message: 'File uploaded successfully', file: file.originalname };
  }
}
