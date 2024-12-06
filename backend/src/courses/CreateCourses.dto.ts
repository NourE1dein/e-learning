import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}
