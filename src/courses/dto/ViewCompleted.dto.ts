import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class ViewCompletedDto{

    
    @IsNotEmpty()
    @IsString()
    @Prop({ required: true })
    title: string;


    @IsNotEmpty()
    @IsString()
    @Prop({ required: true })
    category: string;


    @IsNotEmpty()
    @IsString()
    @Prop({required:true , enum:['completed' , 'enrolled']})
    status:'enrolled' | "completed" ;




}