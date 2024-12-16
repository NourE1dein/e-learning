import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly moduleId: string;

  @IsString()
  @IsNotEmpty()
  readonly comment: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  readonly rating: number;
}
