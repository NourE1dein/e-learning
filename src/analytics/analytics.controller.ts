import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Progress } from './progress.schema';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // Get progress for a specific student and course
  @Get('student/:userId/course/:courseId')
  async getStudentProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.analyticsService.getStudentProgress(userId, courseId);
  }

  // Get overall progress for a specific student (across all courses)
  @Get('student/:userId')
  async getStudentOverallProgress(@Param('userId') userId: string) {
    return this.analyticsService.getStudentOverallProgress(userId);
  }

  // Update progress for a student in a specific course
  @Post('student/:userId/course/:courseId')
  async updateStudentProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
    @Body() body: { completionPercentage: number },
  ) {
    return this.analyticsService.updateStudentProgress(userId, courseId, body.completionPercentage);
  }
}
