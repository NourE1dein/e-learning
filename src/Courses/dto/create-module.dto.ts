import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  readonly moduleId: string;

  @IsString()
  @IsNotEmpty()
  readonly courseId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

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
