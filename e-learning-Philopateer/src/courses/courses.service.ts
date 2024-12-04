import { Injectable } from '@nestjs/common';
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

  // Create a new course
  async createCourse(createCourseDto: CreateCourseDto, instructorId: string): Promise<Course> {
    const instructor = await this.userModel.findById(instructorId).exec();
    if (!instructor || instructor.role !== 'instructor') {
      throw new Error('Instructor not found or user is not an instructor');
    }

    const newCourse = new this.courseModel({
      ...createCourseDto,
      createdBy: instructorId, // Associate the instructor with the course
    });
    return newCourse.save();
  }

  // Get all courses
  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  // Get a course by ID
  async getCourseById(courseId: string): Promise<Course> {
    return this.courseModel.findById(courseId).exec();
  }

  // Get courses by title
  async getCourseByTitle(title: string): Promise<Course[]> {
    return this.courseModel.find({ title }).exec();
  }

  // Get all courses by a specific instructor
  async getCoursesByInstructor(instructorId: string): Promise<Course[]> {
    const instructor = await this.userModel.findById(instructorId).exec();
    if (!instructor || instructor.role !== 'instructor') {
      throw new Error('Instructor not found or user is not an instructor');
    }
    return this.courseModel.find({ createdBy: instructorId }).exec();
  }

  // Update course content (e.g., title, description)
  async updateCourse(courseId: string, updateCourseDto: Partial<Course>): Promise<Course> {
    return this.courseModel.findByIdAndUpdate(courseId, updateCourseDto, { new: true }).exec();
  }

  // Example: upload video or PDF for the course (you may use a file upload package like Multer)
  async uploadMedia(courseId: string, file: Express.Multer.File): Promise<any> {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new Error('Course not found');
    }

    // Save the file path in the course schema (e.g., in a 'resources' array)
    course.resources.push({
      filename: file.originalname,
      path: file.path,
    });

    await course.save();
    return { message: 'File uploaded successfully', file: file.originalname };
  }
}
