import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto{

    @IsString()
    @IsOptional()
    fullName?:string ;

    @IsOptional()
     @IsString()
    email?:string;


    @IsString()
    @IsOptional()
    password? : string;

    @IsString()
    @IsOptional()
    profile_picture_url?: string;


}