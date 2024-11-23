import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';
import { RecommendationSchema } from './recommendation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recommendation', schema: RecommendationSchema }]),
  ],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
