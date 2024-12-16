import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsString({ each: true })
  readonly questions: string[];
}
