import { IsNotEmpty, IsNumber, IsDate, IsMongoId, Min, Max, IsOptional } from 'class-validator';

export class CreatePerformanceDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string; // Reference to the User schema

  @IsNotEmpty()
  @IsMongoId()
  courseId: string; // Reference to the Course schema

@IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  completionPercentage: number; // Completion percentage must be between 0 and 100

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  averageScore: number; // Average score must be between 0 and 100

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalTimeSpent: number; // Total time spent must be a positive number
}
