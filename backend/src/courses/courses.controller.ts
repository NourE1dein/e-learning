import {
  Controller,Get,Post,Body,Param,UploadedFile,UseInterceptors,UseGuards,Patch,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './CreateCourses.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Course } from './course.schema'; 
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './Roles.guard';
import { Roles } from './Roles.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/createCourse/:instructorId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor') // Only instructors can create courses
  async createCourse(
    @Param('instructorId') instructorId: string,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    return this.coursesService.createCourse(createCourseDto, instructorId);
  }

  @Post(':courseId/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor') // Only instructors can upload resources
  async uploadMedia(
    @Param('courseId') courseId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.coursesService.uploadMedia(courseId, file);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'student') // Admins and students can view all courses
  async getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Patch(':courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor') // Only instructors can update their own courses
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateCourseDto: Partial<Course>,
  ) {
    return this.coursesService.updateCourse(courseId, updateCourseDto);
  }
}
