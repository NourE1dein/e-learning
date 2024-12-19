import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/CreateCourse.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { title } from "process";
import { UpdateCourseDto } from "./dto/UpdateCourse.dto";
import { CreateModuleDto } from "../coursemodule/dto/CreateModule.dto";




@Controller('course')
export class CourseController{

    
    constructor(private courseService: CourseService , 



        
    ) {}


 // Endpoint to create a course
 @Post('/createCourse/:instructorId')  
 async createCourse(@Param('instructorId') instructorId: string, @Body() createCourseDto: CreateCourseDto,)
  {
   return this.courseService.createCourse(createCourseDto, instructorId); 
 }


 
 // Get all courses
 @Get()
 async getAllCourses() {
   return this.courseService.getAllCourses();
 }

 // Get a course by ID
 @Get(':id')
 async getCourseById(@Param('id') id: string) {
   return await this.courseService.getCourseById(id);

 }

 // get course by title
 @Get('byTitle/:title')
 async getCourseByTitle(@Param('title') id: string) {
   return await this.courseService.getCourseById(title);
 }


// get course created by instructor
@Get('instructor/:instructorId')
  async getCoursesByInstructor(@Param('instructorId') instructorId: string) {
    return this.courseService.getCoursesByInstructor(instructorId);
     }    

// update course 
@Patch('updateCourse/:instructorId/:courseId')
async updateCourse(
  @Param('instructorId') instructorId: string,
  @Param('courseId') courseId: string,
  @Body(new ValidationPipe()) updateCourseDto: UpdateCourseDto,
) {
  return this.courseService.updateCourse(instructorId, courseId, updateCourseDto);
}    


//enroll course 
@Post(':courseId/enroll/:studentId')
async enrollStudentInCourse(
  @Param('courseId') courseId: string,
  @Param('studentId') studentId: string
) {
  return this.courseService.enrollStudentInCourse(courseId, studentId);
}

// complete enrolled course
@Patch(':courseId/complete/:studentId')
async completeCourse(
  @Param('courseId') courseId: string,
  @Param('studentId') studentId: string
) {
  return this.courseService.StudentCompletedCourse(courseId, studentId);
}

@Get('getEnrolledCourses/:studentId')
async studentGetEnrolledCourses(
  @Param('studentId') studentId: string,
) {
  return this.courseService.studentGetEnrolledCourses(studentId);
}


@Get('studentGetcompletedCourses/:studentId')
async studentGetcompletedCourses(
  @Param('studentId') studentId: string,
){
return this.courseService.studentGetcompletedCourses(studentId)
}



// instructor get all the student courses
@Get('instructorGetCoursesOfstudent/:instructorId/:studentId')
async instructorGetEnrolledCoursesOfstudent(@Param('studentId') studentId:string,
@Param('instructorId') instructorId:string){
return this.courseService.instructorGetEnrolledCoursesOfStudent(instructorId,studentId)
}



 // Add module to courses 
 @Patch('addModuleToCourses')
 async addModuleToCourses(@Body('instructorId') instructorId:string,
 @Body('courseId') courseId:string,
 @Body('moduleId') moduleId:string) {
 
 return await this.courseService.addModuleToCourses(instructorId,courseId,moduleId)

 }


@Patch('notDeleteCourseDb/:instructorId/:courseId')
async NotDeleteCourseDb(@Param("instructorId")instructorId : string ,
@Param("courseId")courseId : string 
){
return this.courseService.NotDeleteCourseDb(instructorId,courseId)
}


}
  
  


