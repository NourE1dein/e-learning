import { IsString, IsOptional, IsArray, IsMongoId, IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';

export class UpdateModuleDto {
  @IsMongoId() 
  @IsString()
  id: string; 

  @IsOptional()
  @IsString()
  title?: string; 
  @IsNotEmpty()

  @IsOptional()
  @IsString()
  content?: string; 
  
  @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
  @IsString()
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
  UpdatedBy: string; 





  
}
