import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { chapter } from "src/schemas/chapter.schema";
import { course } from "src/schemas/Course.schema";
import { user } from "src/schemas/user.schema";
import { CreateModuleDto } from "./dto/CreateModule.dto";
import { CourseService } from "src/courses/course.service";
import { UpdateModuleDto } from "./dto/updateModule.dto";
@Injectable()



export class ChapterService {
  ModuleModel: any;
  constructor(
    @InjectModel(course.name) private readonly courseModel: Model<course>, // Use course.name
    @InjectModel(user.name) private readonly userModel: Model<user>,
    @InjectModel(chapter.name) private readonly chapterModel: Model<chapter>,
  ) {}

  async CreateCourseModule(createModuleDto: CreateModuleDto, instructorId: string) {
    const instructor = await this.userModel.findById(instructorId).exec();
    if (!instructor || instructor.role !== 'instructor') {
      throw new Error('Instructor not found or user is not an instructor');
    }    
    const newModule = new this.chapterModel({
      ...createModuleDto,
      createdBy: instructorId,
      UpdatedBy: instructorId


    });

    return newModule.save();
  }

  async UpdateCourseModule(updateModuleDto: UpdateModuleDto, instructorId: string , moduleId :string) {
    const instructor = await this.userModel.findById(instructorId).exec();
    if (!instructor || instructor.role !== 'instructor') {
      throw new Error('Instructor not found or user is not an instructor');
    }
      const existingModule = await this.chapterModel.findById(moduleId).exec();
    if (!existingModule) {
      throw new Error('Module not found');
    }
  
    if (existingModule.CreatedBy.toString() !== instructorId) {
      throw new Error('You are not authorized to update this module');
    }
  
    Object.assign(existingModule, updateModuleDto);
    return existingModule.save();
  }


async getModuleById(moduleId:string){

  return await this.ModuleModel.findById(moduleId)
}


 





}
