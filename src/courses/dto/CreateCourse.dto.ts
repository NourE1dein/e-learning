import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';

  @IsNotEmpty()
  @Prop({ type: [{ type:Types.ObjectId, ref: 'user' }] })
  enrolledStudents: string[]

  @IsEnum(['enrolled', 'completed'])
  status: 'enrolled' | 'completed'; 


}