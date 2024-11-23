import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress } from './progress.schema';

@Injectable()
export class AnalyticsService {
  constructor(@InjectModel('Progress') private readonly progressModel: Model<Progress>) {}

  // Get the progress of a student in a specific course
  async getStudentProgress(userId: string, courseId: string): Promise<Progress> {
    const progress = await this.progressModel.findOne({ userId, courseId }).exec();
    if (!progress) {
      throw new NotFoundException('Progress not found');
    }
    return progress;
  }

  // Get the overall progress for a student (across all courses)
  async getStudentOverallProgress(userId: string): Promise<Progress[]> {
    return this.progressModel.find({ userId }).exec();
  }

  // Update the progress of a student in a specific course
  async updateStudentProgress(userId: string, courseId: string, completionPercentage: number): Promise<Progress> {
    const progress = await this.progressModel.findOneAndUpdate(
      { userId, courseId },
      { completionPercentage, lastAccessed: new Date() },
      { new: true }
    ).exec();
    
    if (!progress) {
      throw new NotFoundException('Progress not found');
    }
    return progress;
  }
}
