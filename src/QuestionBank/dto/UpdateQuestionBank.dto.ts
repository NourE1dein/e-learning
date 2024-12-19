import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { UpdateQuestionDto } from "../../Quizzes/dto/updateQuestion.dto";
import { Type } from "class-transformer";

export class UpdateQuestionBankDto {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateQuestionDto)
    questions?: UpdateQuestionDto[];
  }