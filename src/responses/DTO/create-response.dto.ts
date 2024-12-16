import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsObject,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class Answer {
  @IsString()
  questionId: string;

  @IsString()
  answer: string;
}

export class CreateResponseDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly quizId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Answer)
  readonly answers: Answer[];

  @IsNumber()
  @Min(0)
  readonly score: number;
}
