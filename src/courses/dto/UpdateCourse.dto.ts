import { Optional } from "@nestjs/common";
import { Prop } from "@nestjs/mongoose";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class UpdateCourseDto{


    @IsOptional()
    @IsString()
    
  title?: string;


  @IsOptional()
  @IsString()
  
  description?: string;


  @IsOptional()
  @IsString()
  
  category?: string;


  @IsOptional()
  @IsString()
  @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
  difficultyLevel?: 'Beginner' | 'Intermediate' | 'Advanced';

  @IsOptional()
  resources?: { filename: string; path: string }[];

}