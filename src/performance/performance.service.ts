import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Performance } from 'src/schemas/Performance.schema';
import { AddOrUpdatePerformanceDto } from './dto/addOrUpdate.dto';
import { CreatePerformanceDto } from './dto/CreatePerformance.dto';
import { course } from 'src/schemas/Course.schema';
import { user } from 'src/schemas/user.schema';
import { chapter } from 'src/schemas/chapter.schema';
import { ChapterService } from 'src/coursemodule/Chapter.service';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectModel(Performance.name) private performanceModel: Model<Performance>,
    @InjectModel(course.name) private readonly courseModel: Model<course>, // Use course.name
    @InjectModel(user.name) private readonly userModel: Model<user>,
    @InjectModel(chapter.name) private readonly chapterModel: Model<chapter>,
  ) {}


  
  async createPerformance(userId: string, courseId: string, createPerformanceDto: CreatePerformanceDto) {
   
      const user = await this.userModel.findById(userId);
      if (!user) throw new HttpException('User does not exist', 400);
  
      const course = await this.courseModel.findById(courseId);
      if (!course) throw new HttpException('Course does not exist', 400);
  
      const existingPerformance = await this.performanceModel.findOne({ userId, courseId }).exec();
      if (existingPerformance) {
        throw new HttpException('Performance record already exists for the user and course.', 400);
      }
  
      const newPerformance = new this.performanceModel({ userId, courseId, ...createPerformanceDto });
      course.performanceEntries.push(newPerformance.id);
      await course.save();

      ////// loop on user and then save the performance to user 
      return newPerformance.save();
    
    }

  

  async getPerformanceByCourse(userId: string, courseId: string) {
    return this.performanceModel.findOne({ userId, courseId }).exec();
  }


  async getAllCoursesWithPerformance(userId: string) {
    return this.performanceModel
      .find({ userId })
      .populate('courseId', 'title description') // Populate course details
      .exec();
  }

   getRecommendedDifficulty = (averageScore: number): string[] => {
    if (averageScore < 50) return ['Beginner'];
    if (averageScore >= 50 && averageScore <= 75) return ['Intermediate'];
    return ['Advanced'];
  };

  
  async getModulesByPerformance(userId: string, courseId: string) {
    console.log('UserId:', userId);
    console.log('CourseId:', courseId);
  
    const performance = await this.performanceModel.findOne({ userId, courseId }).exec();
    console.log('Performance Record:', performance);
  
    if (!performance) {
      throw new HttpException('Performance record not found', HttpStatus.NOT_FOUND);
    }
  
    const recommendedDifficulties = this.getRecommendedDifficulty(performance.averageScore);
    console.log('Recommended Difficulties:', recommendedDifficulties);
  
    const modules = await this.chapterModel
      .find({ courseId, difficultyLevel: { $in: recommendedDifficulties } })
      .exec();
  
    console.log('Modules:', modules);
    return modules;
  }


  
  
}