import { Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { QuestionDto } from "./CreateQuestion.dto";

export class UpdateQuizDto {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    questions?: QuestionDto[];
  }