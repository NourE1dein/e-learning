import {
  IsString,
  IsOptional,
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

export class UpdateResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Answer)
  @IsOptional()
  readonly answers?: Answer[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly score?: number;
}
