import { IsString, IsNotEmpty, IsArray, IsOptional, IsMongoId, IsEnum, IsBoolean } from 'class-validator';

export class CreateModuleDto {

  @IsNotEmpty()
  @IsString()
  title: string; // Title of the module

  @IsNotEmpty()
  @IsString()
  content: string; // Content of the module

  @IsNotEmpty()
  @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resources?: string[]; // Array of resource URLs (optional)

  @IsNotEmpty()
  @IsBoolean()
  isOutdated: boolean;


  @IsNotEmpty()
  @IsMongoId()
  CreatedBy: string; 

  @IsOptional()
  @IsMongoId()
  quizId?: string; // Reference to the quiz for the module

  @IsOptional()
  @IsMongoId()
  questionBankId?: string; // Reference to the question bank for the module

  



}
