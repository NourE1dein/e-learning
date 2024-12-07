import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Performance } from './performance.schema';

@Injectable()
export class PerformanceService{
  constructor(
    @InjectModel(Performance.name)
    private readonly performanceModel: Model<Performance>,
  ){}

  async getPerformanceByUser(userId: string){
    return this.performanceModel.find({ userId }).exec();
  }

  async updatePerformance(userId: string, courseId: string, completionPercentage: number){
    return this.performanceModel.findOneAndUpdate(
      { userId, courseId },
      { completionPercentage, lastAccessed: new Date() },
      { upsert: true, new: true },
    ).exec();
  }

  async getCourseAnalytics(courseId: string) {
    return this.performanceModel.aggregate([
      { $match: { courseId } },
      {
        $group: {
          _id: null,
          avgCompletion: { $avg: '$completionPercentage' },
          avgScore: { $avg: '$averageScore' },
          totalStudents: { $sum: 1 },
        },
      },
    ]);
  }
}
