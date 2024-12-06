import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recommendation } from './recommendation.schema';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel('Recommendation') private readonly recommendationModel: Model<Recommendation>,
  ) {}

  // Fetch recommendations for a user
  async getRecommendations(userId: string): Promise<Recommendation> {
    const recommendation = await this.recommendationModel.findOne({ userId }).exec();
    if (!recommendation) {
      throw new NotFoundException(`No recommendations found for user ${userId}`);
    }
    return recommendation;
  }

  // Generate mock recommendations for a user
  async generateRecommendations(userId: string): Promise<Recommendation> {
    const recommendedItems = ['course1', 'module2']; // Example static recommendations
    const newRecommendation = await this.recommendationModel.findOneAndUpdate(
      { userId },
      { userId, recommendedItems, generatedAt: new Date() },
      { new: true, upsert: true }
    );
    return newRecommendation;
  }
}
