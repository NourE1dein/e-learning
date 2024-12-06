import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recommendation } from './recommendation.schema';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel('Recommendation') private recommendationModel: Model<Recommendation>,
  ) {}

  async getRecommendations(userId: string): Promise<Recommendation> {
    return this.recommendationModel.findOne({ userId }).exec();
  }

  async generateRecommendations(userId: string, additionalData?: any): Promise<Recommendation> {
    const recommendedItems = additionalData?.preferences || ['course1', 'module2', 'course3'];
    const newRecommendation = new this.recommendationModel({
      userId,
      recommendedItems,
    });
    return newRecommendation.save();
  }
}
