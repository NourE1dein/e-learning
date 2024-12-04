import { Controller, Get, Post, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './CreateCourses.dto'; 
import { FileInterceptor } from '@nestjs/platform-express'; 

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Endpoint to create a course
  @Post('/createCourse/:instructorId')  
  async createCourse(
    @Param('instructorId') instructorId: string, 
    @Body() createCourseDto: CreateCourseDto,  
  ) {
    return this.coursesService.createCourse(createCourseDto, instructorId); 
  }

  // Endpoint to upload multimedia resources (like videos, PDFs)
  @Post(':courseId/upload')
  @UseInterceptors(FileInterceptor('file')) 
  async uploadMedia(
    @Param('courseId') courseId: string, 
    @UploadedFile() file: Express.Multer.File,  
  ) {
    return this.coursesService.uploadMedia(courseId, file); 
  }

  // Get all courses
  @Get()
  async getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  // Get a course by ID
  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }
}
