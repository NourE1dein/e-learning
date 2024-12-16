import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateModuleDto {
  @IsString()
  @IsOptional()
  readonly moduleId?: string;

  @IsString()
  @IsOptional()
  readonly courseId?: Types.ObjectId;

  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly resources?: string[];

  @IsBoolean()
  @IsOptional()
  readonly isOutdated?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly questions?: string[];

  @IsArray()
  @IsOptional()
  readonly versions?: Record<string, any>[];
}
