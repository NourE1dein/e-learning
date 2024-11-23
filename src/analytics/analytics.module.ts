import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { ProgressSchema } from './progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Progress', schema: ProgressSchema }]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
