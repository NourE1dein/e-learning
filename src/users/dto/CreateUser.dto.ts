import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto{

    //@IsNotEmpty()
    //@IsString()
    //id:string ;

    @IsNotEmpty()
    @IsString()
    fullName:string ;

    @IsNotEmpty()
    @IsString()
    email:string;


    @IsNotEmpty()
    @IsString()
    password : string;

    
    @IsNotEmpty()
    @IsEnum(['student', 'instructor', 'admin'])
    role:string;

    @IsString()
    @IsOptional()
    profile_picture_url?: string;


   // @IsNotEmpty()
    //@IsDate()
    //@Type(() => Date) 
   // created_at: Date;





    


}



