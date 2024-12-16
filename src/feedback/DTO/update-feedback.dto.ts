import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateFeedbackDto {
  @IsString()
  @IsOptional()
  readonly comment?: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  readonly rating?: number;
}
