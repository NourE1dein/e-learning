import {Controller, Get, Post, Param,  Body,  NotFoundException, Logger } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { UserIdParamDto } from './user-id.dto';

@Controller('recommendations')
export class RecommendationsController {
  private readonly logger = new Logger(RecommendationsController.name);

  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get(':userId')
  async getRecommendations(@Param() params: UserIdParamDto) {
    const { userId } = params;
    this.logger.log(`Fetching recommendations for user ${userId}`);
    const recommendations = await this.recommendationsService.getRecommendations(userId);
    if (!recommendations) {
      throw new NotFoundException(`No recommendations found for user ${userId}`);
    }
    return recommendations;
  }

  @Post(':userId')
  async generateRecommendations(
    @Param() params: UserIdParamDto,
    @Body() additionalData: any,
  ) {
    const { userId } = params;
    this.logger.log(`Generating recommendations for user ${userId}`);
    return this.recommendationsService.generateRecommendations(userId, additionalData);
  }
}