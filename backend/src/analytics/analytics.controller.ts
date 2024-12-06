import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // Endpoint to get student progress data
  @Get('student/:id')
  getStudentProgress(@Param('id') studentId: string) {
    return this.analyticsService.getStudentProgress(studentId);
  }

  // Endpoint to get instructor analytics
  @Get('instructor/:id')
  getInstructorAnalytics(@Param('id') instructorId: string) {
    return this.analyticsService.getInstructorAnalytics(instructorId);
  }
}
