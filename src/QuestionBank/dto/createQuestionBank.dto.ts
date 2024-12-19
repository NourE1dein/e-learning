import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { QuestionDto } from "../../Quizzes/dto/CreateQuestion.dto";
import { Type } from "class-transformer";

export class CreateQuestionBankDto {
    @IsNotEmpty()
    @IsString()
    moduleId: string; // Associated module ID
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    questions: QuestionDto[];
  }