import { Prop } from "@nestjs/mongoose";

export class instructorStudentDto{

    @Prop({required:true})
    fullName:string;
    
    @Prop({required:true,unique:true})
    email:string;

    


}