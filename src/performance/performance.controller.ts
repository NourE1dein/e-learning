import { Controller, Get, Put, Param, Body, Query, Res, Post, Patch, HttpException } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { Response } from 'express';
import { AddOrUpdatePerformanceDto } from './dto/addOrUpdate.dto';
import { CreatePerformanceDto } from './dto/CreatePerformance.dto';
import { chapter } from 'src/schemas/chapter.schema';
import { ChapterService } from 'src/coursemodule/Chapter.service';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService,
    private readonly chapterService: ChapterService , 
  ) {}


 /* @Get('/user/:userId')
  async getPerformanceByUser(@Param('userId') userId: string) {
    return this.performanceService.getPerformanceByUser(userId);
  }
*/
  /*@Put('/update')
  async updatePerformance(
    @Body('userId') userId: string,
    @Body('courseId') courseId: string,
    @Body('completionPercentage') completionPercentage: number,
  ) {
    return this.performanceService.updatePerformance(userId, courseId, completionPercentage);
  }
*/
  /* New routes for dashboard and analytics
  @Get('/dashboard/:userId')
  async getStudentDashboard(@Param('userId') userId: string) {
    return this.performanceService.getStudentDashboard(userId);
  }
*/
  //@Get('/analytics/:courseId')
  //async getInstructorAnalytics(@Param('courseId') courseId: string) {
   // return this.performanceService.getInstructorAnalytics(courseId);
 // }

 /*

  @Get('/export/:courseId')
  async exportAnalytics(
    @Param('courseId') courseId: string,
    @Res() res: Response,
  ) {
    const csv = await this.performanceService.exportAnalyticsReport(courseId);
    res.header('Content-Type', 'text/csv');
    res.attachment(`analytics-${courseId}.csv`);
    res.send(csv);
  }
    */
  @Post('createPerformance/:userId/:courseId')
  async createPerformance(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
    @Body() createPerformanceDto: CreatePerformanceDto,
  ) {
    return this.performanceService.createPerformance(userId,courseId,createPerformanceDto)
  }
  

//get performance for all courses  
  @Get(':userId/courses')
  async getAllCoursesWithPerformance(@Param('userId') userId: string) {
    return this.performanceService.getAllCoursesWithPerformance(userId);
  }

  // get performance for a course 
  @Get(':userId/courses/:courseId')
  async getPerformanceByCourse(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.performanceService.getPerformanceByCourse(userId, courseId);
  }



  @Get('recommended-modules/:userId/:courseId')
async getRecommendedModules(
  @Param('userId') userId: string,
  @Param('courseId') courseId: string
) {
  return this.performanceService.getModulesByPerformance(userId, courseId);
}
}
