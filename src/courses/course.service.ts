import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { course } from "src/schemas/Course.schema";
import { ViewEnrolledDto } from "./dto/ViewEnrolled.dto";
import { ViewCompletedDto } from "./dto/ViewCompleted.dto";
import { CreateCourseDto } from "./dto/CreateCourse.dto";
import { Body, HttpException, HttpStatus, Injectable, Post } from "@nestjs/common";
import { user } from "src/schemas/user.schema";
import { UpdateCourseDto } from "./dto/UpdateCourse.dto";
import {UploadedFile, UseInterceptors } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { Request } from 'express';
import { CreateModuleDto } from "../coursemodule/dto/CreateModule.dto";
import { chapter } from "src/schemas/chapter.schema";
import { find } from "rxjs";


@Injectable()
export class CourseService {

    constructor(
        @InjectModel('course') private readonly courseModel: Model<course>,
        @InjectModel(user.name) private UserModel: Model<user> ,
        @InjectModel(user.name) private chapterModel: Model<chapter> ,

      ) {}


  // Create a new course
  async createCourse(createCourseDto: CreateCourseDto, instructorId: string) {
    const instructor = await this.UserModel.findById(instructorId).exec();
    if (!instructor || instructor.role !== 'instructor') {
      throw new Error('Instructor not found or user is not an instructor');
    }

    const newCourse = new this.courseModel({
      ...createCourseDto,
      createdBy: instructorId, 
    });
    return newCourse.save();
  }



  // Get all courses
  async getAllCourses() {
    return this.courseModel.find().exec();
  }

  // Get a course by ID
  async getCourseById(courseId: string) {
    return this.courseModel
      .findById(courseId)
      .populate('modules') // Populate the `modules` field with module details
      .exec();
  }


  // Get courses by title
  async getCourseByTitle(title: string) {
    return this.courseModel.find({ title }).exec();
  }



  // Get all courses by a specific instructor
  async getCoursesByInstructor(instructorId: string){
    const instructor = await this.UserModel.findById(instructorId).exec();
    if (!instructor || instructor.role !== 'instructor') {
      throw new Error('Instructor not found or user is not an instructor');
    }
    return this.courseModel.find({ createdBy: instructorId }).exec();
  };


  // Update course content (e.g., title, description)
  async updateCourse(instructorId:string ,courseId: string, updateCourseDto : UpdateCourseDto){
    const instructor = await this.UserModel.findById(instructorId).exec();
    if (!instructor || instructor.role !== 'instructor') {
      throw new Error('Instructor not found or user is not an instructor');
    }

    const course = await this.courseModel.findOne({ _id: courseId, createdBy: instructorId }).exec();
    if (!course) {
      throw new Error('Course not found or unauthorized access');
    }
    return this.courseModel.findByIdAndUpdate(
      courseId,
      { $set: updateCourseDto },
      { new: true },
    ).exec();  }





  
    /*async uploadMedia(courseId: string, file: Express.Multer.File) {
      // Check if the course exists
      const course = await this.courseModel.findById(courseId).exec();
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
  
      // Validate the file
      if (!file || !file.originalname || !file.path) {
        throw new HttpException('Invalid file upload', HttpStatus.BAD_REQUEST);
      }
  
      // Append the file details to the `resources` array
      course.resources.push({
        filename: file.originalname,
        path: file.path,
      });
  
      // Save the course
      await course.save();
  
      return {
        message: 'File uploaded successfully',
        filename: file.originalname,
        path: file.path,
      };
}
      */




async enrollStudentInCourse(courseId: string, studentId: string) {
  const course = await this.courseModel.findById(courseId).exec();
  if (!course) {
    throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
  }

  const student = await this.UserModel.findById(studentId).exec();
  if (!student || student.role !== 'student') {
    throw new HttpException('Student not found or user is not a student', HttpStatus.NOT_FOUND);
  }

  if (student.enrolledCourses.some((enrolledCourseId) => enrolledCourseId.toString() === courseId)) {
    throw new HttpException('Student is already enrolled in this course', HttpStatus.BAD_REQUEST);
  }

  student.enrolledCourses.push(courseId);
  await student.save();
  course.enrolledStudents.push(studentId);
  await course.save();   

  return { message: 'Student enrolled successfully'};
}



async StudentCompletedCourse(courseId: string, studentId: string) {
  // Find the student
  const student = await this.UserModel.findById(studentId).exec();
  if (!student || student.role !== "student") {
    throw new HttpException('Student does not exist', HttpStatus.NOT_FOUND);
  }

  // Check if the course is in the enrolledCourses array
  const enrolledCourseIndex = student.enrolledCourses.findIndex(
    (enrolledCourseId) => enrolledCourseId.toString() === courseId
  );

  if (enrolledCourseIndex === -1) {
    throw new HttpException('Course not found in enrolled courses', HttpStatus.BAD_REQUEST);
  }

  // Remove the course from enrolledCourses
  student.enrolledCourses.splice(enrolledCourseIndex, 1);

  // Add the course to completedCourses
  student.completedCourses.push(new Types.ObjectId(courseId)); // Ensure courseId is treated as an ObjectId

  // Save the updated student
  await student.save();

  return { message: 'Course marked as completed', student };
}



async studentGetEnrolledCourses(studentId: string) {
  // Fetch the student with the role and populate the enrolledCourses
  const student = await this.UserModel.findById(studentId)
  .populate('enrolledCourses')
  .exec();

if (!student || student.role !== "student")throw new HttpException("Student does not exist", HttpStatus.NOT_FOUND);

return student.enrolledCourses;

}


async instructorGetEnrolledCoursesOfStudent(
  instructorId: string,
  studentId: string
) {
  const instructor = await this.UserModel.findById(instructorId).exec();
  if (!instructor || instructor.role !== 'instructor') {
    throw new HttpException('Instructor does not exist', HttpStatus.BAD_REQUEST);
  }

  const student = await this.UserModel.findById(studentId)
    .populate({
      path: 'enrolledCourses', // Populate enrolledCourses
      model: 'course',
    })
    .exec();

  if (!student || student.role !== 'student') {
    throw new HttpException('Student does not exist', HttpStatus.BAD_REQUEST);
  }
  return student.enrolledCourses

}



//student get his completed courses
async studentGetcompletedCourses(studentId:string){

  const student = await this.UserModel.findById(studentId).populate('completedCourses').exec()

  if (!student || student.role !== "student")throw new HttpException("Student does not exist", HttpStatus.NOT_FOUND);

  return student.completedCourses;

}

  // Add module to course
  async addModuleToCourses(instructorId: string, courseId: string, moduleId: string) {
    const instructor = await this.UserModel.findOne({instructorId});
    if (!instructor || instructor.role !== 'instructor') {
        throw new HttpException('Instructor does not exist or is not an instructor', HttpStatus.NOT_FOUND);
    }

    const course = await this.courseModel.findOne({courseId});
    if (!course) {
        throw new HttpException('Course does not exist in database', HttpStatus.NOT_FOUND);
    }

    const module = await this.chapterModel.findOne({moduleId});
    console.log('Module found:', module);
    if (!module) {
        throw new HttpException('Module does not exist with the given title', HttpStatus.BAD_REQUEST);
    }

    // Check if the module title already exists in the course
    if (course.modules.includes(moduleId)) {
        throw new HttpException('Module is already added to this course', HttpStatus.CONFLICT);
    }

    // Add the module title to the modules array in the course
    course.modules.push(moduleId);

    // Save the course with the updated modules array
    await course.save();

    // Return success message
    return { message: `Module "${moduleId}" added to course successfully` };
}



async NotDeleteCourseDb(userId: string, courseId: string) {
  // Find and update the course's status to 'unavailable'
  const course = await this.courseModel.findOneAndUpdate(
    { _id: courseId },     // Find the course by its ID
    { status: 'unavailable' },  // Update the status to 'unavailable'
    { new: true }           // Return the updated course document
  );

  // If the course is not found, throw an error
  if (!course) {
    throw new HttpException('Course not found', HttpStatus.BAD_REQUEST);
  }

  // Find the user and check if they are an admin or instructor
  const user = await this.UserModel.findById(userId);
  if (!user || (user.role !== 'admin' && user.role !== 'instructor')) {
    throw new HttpException('Not authorized', HttpStatus.BAD_REQUEST);
  }

  return { message: 'Course marked as unavailable successfully' };
}

    
}


  







