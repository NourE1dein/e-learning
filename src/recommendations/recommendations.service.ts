import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recommendation } from './recommendation.schema';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel('Recommendation') private recommendationModel: Model<Recommendation>,
  ) {}

  // Fetch recommendations for a user
  async getRecommendations(userId: string): Promise<Recommendation> {
    return this.recommendationModel.findOne({ userId }).exec();
  }

  // Generate recommendations (mock logic)
  async generateRecommendations(userId: string): Promise<Recommendation> {
    const recommendedItems = ['course1', 'module2', 'course3']; // Placeholder logic
    const newRecommendation = new this.recommendationModel({
      userId,
      recommendedItems,
    });
    return newRecommendation.save();
  }
}
