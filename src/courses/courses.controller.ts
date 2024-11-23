import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.schema';
import { Module } from './module.schema';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Create a new course
  @Post()
  async createCourse(@Body() courseData: Partial<Course>) {
    return this.coursesService.createCourse(courseData);
  }

  // Get all courses
  @Get()
  async getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  // Get a course by ID
  @Get(':id')
  async getCourseById(@Param('id') courseId: string) {
    return this.coursesService.getCourseById(courseId);
  }

  // Create a new module for a course
  @Post(':id/modules')
  async createModule(
    @Param('id') courseId: string,
    @Body() moduleData: Partial<Module>,
  ) {
    moduleData.courseId = courseId; // Link the module to the course
    return this.coursesService.createModule(moduleData);
  }

  // Get all modules for a specific course
  @Get(':id/modules')
  async getModulesByCourseId(@Param('id') courseId: string) {
    return this.coursesService.getModulesByCourseId(courseId);
  }
}
