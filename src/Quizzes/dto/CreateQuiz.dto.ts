// create-quiz.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsArray, IsNotEmpty, IsOptional, ValidateNested, IsEnum } from 'class-validator';
import { QuestionDto } from './CreateQuestion.dto';

   

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  moduleId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @IsOptional()
  createdAt: Date;
}
