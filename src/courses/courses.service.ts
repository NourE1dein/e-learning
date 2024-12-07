import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';
import { Module } from './module.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,
    @InjectModel('Module') private readonly moduleModel: Model<Module>,
  ) {}

  // Create a new course
  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const newCourse = new this.courseModel(courseData);
    return newCourse.save();
  }

  // Get all courses
  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  // Get a course by ID
  async getCourseById(courseId: string): Promise<Course> {
    const course = await this.courseModel.findById(courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  // Create a new module for a course
  async createModule(moduleData: Partial<Module>): Promise<Module> {
    const newModule = new this.moduleModel(moduleData);
    return newModule.save();
  }

  // Get modules for a specific course
  async getModulesByCourseId(courseId: string): Promise<Module[]> {
    return this.moduleModel.find({ courseId }).exec();
  }
}
