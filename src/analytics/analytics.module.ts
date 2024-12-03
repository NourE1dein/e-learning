import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Performance, PerformanceSchema } from './performance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Performance.name, schema: PerformanceSchema }]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
