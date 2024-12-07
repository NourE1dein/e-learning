import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { PerformanceService } from './performance.service';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get('/user/:userId')
  async getPerformanceByUser(@Param('userId') userId: string) {
    return this.performanceService.getPerformanceByUser(userId);
  }

  @Put('/update')
  async updatePerformance(
    @Body('userId') userId: string,
    @Body('courseId') courseId: string,
    @Body('completionPercentage') completionPercentage: number,
  ) {
    return this.performanceService.updatePerformance(userId, courseId, completionPercentage);
  }
}
