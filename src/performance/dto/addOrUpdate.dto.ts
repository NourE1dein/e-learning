import { IsOptional, IsNumber, IsMongoId, IsDate, Min, Max } from 'class-validator';

export class AddOrUpdatePerformanceDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  completionPercentage?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  averageScore?: number;

  @IsOptional()
  @IsDate()
  lastAccessed?: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalTimeSpent?: number;
}
