import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Performance, PerformanceDocument } from './performance.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Performance.name) private performanceModel: Model<PerformanceDocument>,
  ) {}

  // Create a new performance record
  async createPerformance(data: Partial<Performance>): Promise<Performance> {
    const newPerformance = new this.performanceModel(data);
    return newPerformance.save();
  }

  // Get performance by user ID and course ID
  async getPerformance(userId: string, courseId: string): Promise<Performance> {
    return this.performanceModel.findOne({ userId, courseId }).exec();
  }

  // Update performance
  async updatePerformance(userId: string, courseId: string, updates: Partial<Performance>): Promise<Performance> {
    return this.performanceModel.findOneAndUpdate(
      { userId, courseId },
      updates,
      { new: true },
    ).exec();
  }

  async getStudentProgress(id:String){
    return this.performanceModel.findById(id);
  }

  async getInstructorAnalytics(id:String){
    return this.performanceModel.findById(id);
  }
}
