import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateQuizDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly questions?: string[];
}
