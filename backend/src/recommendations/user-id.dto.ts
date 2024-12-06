import { IsString, IsNotEmpty } from 'class-validator';

export class UserIdParamDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
