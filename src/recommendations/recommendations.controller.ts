import { Controller, Get, Post, Param } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  // Get recommendations for a user
  @Get(':userId')
  async getRecommendations(@Param('userId') userId: string) {
    return this.recommendationsService.getRecommendations(userId);
  }

  // Generate new recommendations for a user (mock for now)
  @Post(':userId')
  async generateRecommendations(@Param('userId') userId: string) {
    return this.recommendationsService.generateRecommendations(userId);
  }
}
