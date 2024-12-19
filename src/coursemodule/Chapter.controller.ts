import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CourseService } from "src/courses/course.service";
import { ChapterService } from "./Chapter.service";
import { CreateModuleDto } from "./dto/CreateModule.dto";
import { UpdateModuleDto } from "./dto/updateModule.dto";




@Controller('courseModule')
export class ChapterController{

    
    constructor(private readonly chapterService: ChapterService , 
         
    ) {}


@Get('getModule')
async getModuleById(@Body('moduleId') moduleId:string){
  return this.chapterService.ModuleModel(moduleId)
}



    @Post('/createModule/:instructorId')  
 async CreateCourseModule(@Param('instructorId') instructorId: string, @Body() createModuleDto: CreateModuleDto,)
  {
   return this.chapterService.CreateCourseModule(createModuleDto, instructorId); 
 }


 @Patch('/updateModule/:instructorId/:moduleId')
 async UpdateCourseModule(
   @Param('instructorId') instructorId: string,
   @Param('moduleId') moduleId: string,

   @Body() updateModuleDto: UpdateModuleDto,
 ) {
   return this.chapterService.UpdateCourseModule(updateModuleDto, instructorId , moduleId);
 }
  








}


