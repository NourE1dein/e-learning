import { IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";


export class LoginUserDto{


    @IsString()
    @IsNotEmpty()
    email:string;


    @IsNotEmpty()
    @IsString()
    password:string;



}